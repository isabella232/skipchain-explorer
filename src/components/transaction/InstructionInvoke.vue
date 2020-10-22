<template>
  <v-expansion-panel :value=0>
    <v-expansion-panel-content>
      <template slot="header">
        <div>
          <strong>On instance {{ iid }},
           invoke command {{ instruction.index + 1}}/{{ total }}: {{ instruction.invoke.command }}</strong>
        </div>
      </template>

      <v-list class="invoke-instruction-list">
        <v-list-tile v-for="arg in args" :key="arg.name">
          <v-list-tile-content>
            <v-card-text>
              {{ arg.name }}
              <br>
              {{ arg.value }}
            </v-card-text>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { formatArg, bytes2Hex } from '../../utils'

export default {
  props: ['instruction', 'total'],
  computed: {
    args: function () {
      return this.instruction.invoke.args.map((arg) => {
        return {
          name: `Name: ${arg.name}`,
          value: formatArg(`${this.instruction.invoke.command}.${arg.name}`, arg.value)
        }
      })
    },
    iid: function () {
      return bytes2Hex(this.instruction.instanceid)
    }
  }
}
</script>

<style>
.invoke-instruction-list .v-list__tile {
  height: auto;
}
</style>
