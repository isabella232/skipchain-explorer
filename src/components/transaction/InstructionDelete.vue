<template>
  <v-expansion-panel :value=0>
    <v-expansion-panel-content>
      <template slot="header">
        <div>
          <strong>Delete on contract type {{ instruction.delete.contractid }} on instance {{ iid }}</strong>
        </div>
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { bytes2Hex } from '../../utils'

export default {
  props: ['instruction'],
  computed: {
    iid: function () {
      return bytes2Hex(this.instruction.instanceid)
    }
  }
}
</script>
