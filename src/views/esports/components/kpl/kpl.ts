
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "kpl",
  props: {
    msg: String,
  },
  setup(){
    //战队头像
    const teamHeaderA = ref();
    const teamHeaderB = ref();
    teamHeaderA.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    teamHeaderB.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    // 用户头像  前四名
    const teamUserA = ref();
    const teamUserB = ref();
    teamUserA.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    teamUserB.value = [
      '/kpl/header.png','/kpl/header.png','/kpl/header.png','/kpl/header.png'
    ];
    // nft奖励部分的数据
    const kplNft = ref();
    kplNft.value = [
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      },
      {
        fromName:'由XXXX提供',
        award:"2000張 卡牌+Key一枚",
        win:"胜方投票NO.3",
        url:"/kpl/test.png"
      }
    ]
    return{
      teamHeaderA,
      teamHeaderB,
      teamUserB,
      teamUserA,
      kplNft
    }
  }
});