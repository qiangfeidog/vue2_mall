import BackTop from "@/components/common/backTop/BackTop"
import { POP, NEW, SELL } from './const'
export const backTopMxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 300)
    }
  }
}

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}