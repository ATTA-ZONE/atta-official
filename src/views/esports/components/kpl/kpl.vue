<template>
<!-- banner部分 -->
  <div class="banner-container">
    <div class="banner-info">
      <img src="/kpl/titleCh.png" />
      <div class="kpl-time">2021nain9yue24ri - 31ri</div>
      <div class="kpl-team">当前对战双方： TEAM1 VS TEAM2</div>
      <div class="kpl-btn flex"> 
        <span>参与投票</span>
        <span>观看直播</span>
      </div>
    </div>
  </div>
  <!-- 奖池部分 -->
  <div class="kpl-prize-pool margin-auto">
    <div class="kpl-welcome flex">
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p>欢迎</p>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
    </div>
    <div class="kpl-vip flex">
      <img src="/kpl/card.png" alt="">
      <div class="vip-text">
        <h5>尊敬的会员们</h5>
        <p>这个特殊的日子终于到了<br/>就在下一个月圆之夜<span>，9月24日</span></p>
        <h5>是时候带上您的面具，盛装出席了</h5>
      </div>
    </div>
    <div class="prize-pool">
      <h5>我们为您准备了，极为丰厚的奖池</h5>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p>每场比赛胜方投票玩家，投票数为前三名的，均可获得NFT等额外权益奖励。<br/>每场比赛败方玩家，投票数为第一名的，可获得NFT等额外权益奖励。</p>
      <div class="award-list">
        <div class="award flex">
          <p class="award-left">PRIZE POOL</p>
          <p class="award-right">每場投票獎池達 <span>3000 BUSD</span></p>
        </div>
        <div class="award flex">
          <p class="award-left" style="font-size:20px;">BATTLE REWARD</p>
          <p class="award-right">總價值 <span>3,000U</span>現金+<span>NFT</span></p>
        </div>
      </div>
    </div>
  </div>
  <!-- 排行 -->
  <div class="kpl-ranking margin-auto">
    <div class="rank-header flex">
      <p>Top4投票观众</p>
      <button>查看排行</button>
    </div>
    <div class="rank-list flex">
      <div class="ranking" v-for="item in 4">
        <p>总投票排行NO.{{item}}</p>
        <img src="/kpl/headerBanner.png" alt="">
      </div>
    </div>
    <button class="ranking-more">更多奖励详情</button>
  </div>
  <!-- 规则 -->
  <div class="kpl-rules margin-auto">
    <h5>ATTA x 英雄聯盟主播系列 NFT <br/>兌換「面具」規則 </h5>
    <img class="bgi01" src="/kpl/bgi01.png" alt="">
    <p>01 持有ATTA x 英雄聯盟主播系列 NFT的用戶可按照規則兌換「面具」NFT：本次可兌換總量為20個。<br/>02 您持有的SR為20分，R為5分，N為1分，滿30分即可兌換面具； <br/>03 英雄聯盟主播系列NFT兌換即銷毀。</p>
    <button>兑换面具</button>
    <div class="rules-img flex">
      <img src="/kpl/rules01.png" alt="">
      <img src="/kpl/rules02.png" alt="">
      <img src="/kpl/rules03.png" alt="">
    </div>
  </div>
  <!-- 面具 -->
  <div class="kpl-mask">
    <div class="mask-header margin-auto">
      <p>Infinity Headset Genesis「面具」系列NFT</p>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <button>敬请期待</button>
    </div>
    <div class="kpl-banner banner-01"></div>
    <div class="kpl-banner banner-02"></div>
  </div>
  <!-- 赛程 -->
  <div class="kpl-schedule margin-auto">
    <div class="schedule-header">
      <p class="schedule-title">大會賽程</p>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p class="schedule-time">活動時間：2021年9月3日15:00～2021年10月17日23:59</p>
    </div>
    <div class="schedule-expect">敬请期待</div>
  </div>
  <!-- 预告 -->
  <div class="kpl-notice margin-auto">
    <div class="notice-header flex">
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p>活動預告</p>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
    </div>
    <p class="notice-time">9月XX日</p>
    <div class="notice-team margin-auto flex">
      <div class="team">
        <div class="team-top flex">
          <div class="team-header flex">  
            <img v-for="item in teamHeaderA" :src="item" :key="item" alt="">
          </div>
          <div class="team-name team-a">TEAM A</div>
        </div>
        <div class="team-ranking">
          <div class="ranking-user flex">
            <img v-for="item in teamUserA" :src="item" :key="item" alt="">
            <p>31</p>
          </div>
        </div>
        <button class="margin-auto">投票</button>
      </div>
      <div class="team">
        <div class="team-top flex">
          <div class="team-name team-b">TEAM B</div>
          <div class="team-header flex">  
            <img v-for="item in teamHeaderB" :src="item" :key="item" alt="">
          </div>
        </div>
        <div class="team-ranking">
          <div class="ranking-user flex">
            <img v-for="item in teamUserA" :src="item" :key="item" alt="">
            <p>31</p>
          </div>
        </div>
        <button class="margin-auto">投票</button>
      </div>
    </div>
    <div class="notice-btn margin-auto flex">
      <p>我的投票券：00张</p>
      <div>
        <button>领取投票券</button>
        <button class="btn-right">购买投票券</button>
      </div>
    </div>
  </div>
  <!-- 奖池 -->
  <div class="kpl-award margin-auto">
    <h5>本场投票奖池：3000 BUSD</h5>
    <div class="kpl-award-team flex">
      <div class="award-team">
        <h5>如A队胜利</h5>
        <p>当前投票总数：XXXX票</p>
        <p>单票奖励：XXXX BUSD</p>
      </div>
      <div class="award-team">
        <h5>如B队胜利</h5>
        <p>当前投票总数：XXXX票</p>
        <p>单票奖励：XXXX BUSD</p>
      </div>
    </div>
  </div>
  <!-- 投票排行 -->
  <div class="kpl-voting-ranking margin-auto">
    <h5>本场投票排行</h5>
    <div class="voting-ranking flex">
      <div class="voting-ranking-list">
        <div class="ranking-bumber flex">
          <img src="/kpl/No1.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
        <div class="ranking-bumber flex">
          <img src="/kpl/No2.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
        <div class="ranking-bumber flex">
          <img src="/kpl/No3.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
      </div>
      <div class="voting-ranking-list">
        <div class="ranking-bumber flex">
          <img src="/kpl/No1.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
        <div class="ranking-bumber flex">
          <img src="/kpl/No2.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
        <div class="ranking-bumber flex">
          <img src="/kpl/No3.png" alt="">
          <img src="/kpl/header.png" alt="">
          <div>
            <p>32票</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- NFT奖励 -->
  <div class="kpl-nft margin-auto">
    <h5>NFT奖励</h5>
    <div class="nft-list flex">
      <div class="nft-content flex" v-for="item in kplNft" :key="item">
        <div>
          <p class="nft-from">{{item.fromName}}</p>
          <p class="nft-award">{{item.award}}</p>
          <p class="nft-win">{{item.win}}</p>
        </div>
        <img :src="item.url" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./kpl.ts"></script>
<style>
html{
  min-width: 1440px !important;
  overflow-x: auto;
}
</style>
<style scoped lang='scss'>
@import "./kpl.scss";
</style>