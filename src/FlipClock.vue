<template>
  <div class="FlipClock">
    <!--时分秒-->
    <template v-if="['{h}{i}{s}', 'time'].includes(mode)">
      <Flipper ref="flipperHour1" :custom-class="flipperClass"/>
      <Flipper ref="flipperHour2" :custom-class="flipperClass"/>
      <em>:</em>
      <Flipper ref="flipperMinute1" :custom-class="flipperClass"/>
      <Flipper ref="flipperMinute2" :custom-class="flipperClass"/>
      <em>:</em>
      <Flipper ref="flipperSecond1" :custom-class="flipperClass"/>
      <Flipper ref="flipperSecond2" :custom-class="flipperClass"/>
    </template>
    <!--分秒-->
    <template v-if="mode === '{i}{s}'">
      <Flipper ref="flipperMinute1" :custom-class="flipperClass"/>
      <Flipper ref="flipperMinute2" :custom-class="flipperClass"/>
      <em>:</em>
      <Flipper ref="flipperSecond1" :custom-class="flipperClass"/>
      <Flipper ref="flipperSecond2" :custom-class="flipperClass"/>
    </template>
    <!--分-->
    <template v-if="mode === '{i}'">
      <Flipper ref="flipperMinute1" :custom-class="flipperClass"/>
      <Flipper ref="flipperMinute2" :custom-class="flipperClass"/>
    </template>
    <!--秒-->
    <template v-if="mode === '{s}'">
      <Flipper ref="flipperSecond1" :custom-class="flipperClass"/>
      <Flipper ref="flipperSecond2" :custom-class="flipperClass"/>
    </template>
  </div>
</template>

<script>
import Flipper from './Flipper'
import { getTimerStr, format, subtract } from './utils'
export default {
  name: 'FlipClock',
  data () {
    return {
      timer: null,
      flipObjs: []
    }
  },
  props: {
    mode: {
      type: String,
      default: 'time' // time, {h}{i}{s}, {i}{s} {s}
    },
    initValue: {
      type: String,
      default: '30s' // 90i 90分，1h 小时 30s 30秒
    },
    flipperClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    modeIsEqualTime ({ mode }) {
      return mode === 'time'
    }
  },
  components: {
    Flipper
  },
  created () {
    if (!this.modeIsEqualTime) {
      const timeMap = {
        h: 3600, // 时
        i: 60, // 分
        s: 1 // 秒
      }
      this.s = timeMap[this.initValue.slice(-1)] * this.initValue.slice(0, -1)
    }
  },
  mounted () {
    switch (this.mode) {
      case '{i}{s}':
        this.flipObjs = [
          this.$refs.flipperMinute1,
          this.$refs.flipperMinute2,
          this.$refs.flipperSecond1,
          this.$refs.flipperSecond2
        ]
        break
      case '{i}':
        this.flipObjs = [
          this.$refs.flipperMinute1,
          this.$refs.flipperMinute2
        ]
        break
      case '{s}':
        this.flipObjs = [
          this.$refs.flipperSecond1,
          this.$refs.flipperSecond2
        ]
        break
      default:
        this.flipObjs = [
          this.$refs.flipperHour1,
          this.$refs.flipperHour2,
          this.$refs.flipperMinute1,
          this.$refs.flipperMinute2,
          this.$refs.flipperSecond1,
          this.$refs.flipperSecond2
        ]
    }
    this.init()
    this.run()
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    // 初始化数字
    init () {
      const nowTimeStr = this.modeIsEqualTime ? format(new Date(),'{h}{i}{s}') : getTimerStr(this.s, this.mode)
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i])
      }
    },
    // 开始计时
    run () {
      this.timer = setInterval(() => {
        // 获取当前时间
        let nowTimeStr
        let nextTimeStr
        if (this.modeIsEqualTime) {
          nowTimeStr = format(subtract(new Date, 1, 's'), '{h}{i}{s}')
          nextTimeStr = format(new Date(), '{h}{i}{s}')
        } else {
          nextTimeStr = getTimerStr(this.s - 1, this.mode)
          nowTimeStr = getTimerStr(this.s, this.mode)
          this.s -= 1
          if (this.s <= 0) {
            clearInterval(this.timer)
          }
        }
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i])
        }
      }, 1000)
    }
  }
}
</script>
