<template>
  <v-app>
    <v-toolbar
    app
    extended
      :clipped-left="clipped"
    >
      <router-link :to="`/${$route.params.chain || ''}`" class="title-link">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <router-link :to="`/${$route.params.chain}/graph`" class="title-link">
        <v-btn flat>Graph</v-btn>
      </router-link>

      <router-link :to="`/${$route.params.chain}/measurements`" class="title-link">
        <v-btn flat>Measurements</v-btn>
      </router-link>

      <router-link :to="`/${$route.params.chain}/status`" class="title-link">
        <v-btn flat>Status</v-btn>
      </router-link>

      <!--header -->
      <v-menu :nudge-width="100" slot="extension">
        <v-toolbar-title slot="activator">
          <span>Current Skipchain: {{chosenSkipchain && chosenSkipchain.slice(0,16)}}...</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="skipchain in skipchains"
            :key="JSON.stringify(skipchain)"
            @click="chooseSkipchain"
          >
            <v-list-tile-title v-text="skipchain"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <UserRoster :connectToCothority="connectToCothority" />
    </v-toolbar>

    <Explorer v-if="socket" :roster="roster" :socket="socket" :key="JSON.stringify(chosenSkipchain)"/>

    <v-footer :fixed="fixed" app>
      <span style="padding-left: 1rem">&copy; DEDIS 2020 - <a href="https://github.com/dedis/skipchain-explorer">Github</a></span>
      <span style="padding-left: 1rem">v.{{version}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { curve } from '@dedis/kyber'
import { Roster, ServerIdentity } from '@dedis/cothority/network'
import { SkipchainRPC } from '@dedis/cothority/skipchain'
import Explorer from './Explorer'
import UserRoster from './components/UserRoster'
import defaultRoster from './default-roster'
import { bytes2Hex } from './utils'
import { version } from '../package.json'

const STORE_KEY_SKIPCHAINS = 'dedis_cache_skipchains'

export default {
  name: 'App',
  components: { 'Explorer': Explorer, 'UserRoster': UserRoster },
  data () {
    let skipchains = []
    try {
      const cache = window.localStorage.getItem(STORE_KEY_SKIPCHAINS)
      skipchains = JSON.parse(cache) || []
    } catch (e) {
      // not set, ignoring the error
    }

    return {
      version,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SkipChain Explorer',
      socket: null,
      blocks: [],
      skipchains,
      chosenSkipchain: this.$route.params.chain
    }
  },
  mounted: function () {
    // we should be able to get this from this.$route.query, but sometimes it
    // is not populated by the time we are called?
    let params = new URLSearchParams(window.location.search);
    
    // With a URL ending like this, connect to a different cothority.
    // https://host.example.com/?leader=conode.example.com
    var ro
    if (params.get('leader')) {
      var leader = params.get('leader')
      if (typeof leader === 'string') {
        leader = [ leader ]
      }
      var list = leader.map((server) => {
        return new ServerIdentity({
          address: server,
          url: `https://${server}/`,
          // Put a dummy public key in; the real roster will be downloaded
          // from the leader (and, unfortunately, trusted).
          public: curve.newCurve("edwards25519").point().toProto(),
        })
      })
      ro = new Roster({ list })
      console.log("roster from params:", ro)
    } else {
      console.log("roster from default")
      ro = Roster.fromTOML(defaultRoster)
    }

    this.connectToCothority(ro)
  },
  methods: {
    chooseSkipchain: function (e, path) {
      var v
      if (typeof e === 'string') {
        v = e
      } else {
        v = e.target.innerText.slice(0, 64)
      }

      // Make it possible for connectToCothority to request that we jump
      // directly to the status page.
      if (path) {
        this.$router.push(`/${v}/${path}`)
      } else {
        this.$router.push(`/${v}`)
      }
      this.chosenSkipchain = v
      this.$forceUpdate()
    },

    connectToCothority: function (ro) {
      this.roster = ro
      this.socket = new SkipchainRPC(this.roster)

      /* get all skipchains IDs and map each of them to its hexadecimal form */
      this.socket.getAllSkipChainIDs().then(
        (ids) => {
          this.skipchains = ids.map(bytes2Hex)
          window.localStorage.setItem(STORE_KEY_SKIPCHAINS, JSON.stringify(this.skipchains))

          if (!this.$route.params.chain && this.skipchains.length >= 1) {
            console.log('auto choose 1st skipchain')
            this.chooseSkipchain(this.skipchains[0], 'status')
          }
        },
        (e) => {
          console.log('could not get all skipchains', e)
        }
      )
    }
  }
}
</script>
<style>
  .title-link {
    text-decoration: none;
    color: black;
  }
</style>
