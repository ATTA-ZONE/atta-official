<template>
<!-- banner部分 -->
  <div class="kpl">
    <div class="banner-container">
      <div class="banner-info">
        <img src="/kpl/titleCh.png" />
        <div class="kpl-time">{{$t('esports_kpl1')}}</div>
        <div class="kpl-team" v-if="kplinfo[showkplindex]">{{kplinfo[showkplindex].teamA + ' VS ' + kplinfo[showkplindex].teamB}}</div>
        <div class="kpl-btn flex"> 
          <span>{{$t('esports_kpl3')}}</span>
          <span>{{$t('esports_kpl4')}}</span>
        </div>
      </div>
    </div>
    <!-- 奖池部分 -->
    <div class="kpl-prize-pool margin-auto">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl4_jia')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="kpl-vip flex">
        <img src="/kpl/card.png" alt="">
        <div class="vip-text">
          <h5>{{$t('esports_kpl5')}}</h5>
          <p>
            <span v-html="$t('esports_kpl6')"></span>
            <span>{{$t('esports_kpl7')}}</span>
          </p>
          <h5>{{$t('esports_kpl8')}}</h5>
        </div>
      </div>
      <div class="prize-pool">
        <h5>{{$t('esports_kpl9')}}</h5>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p v-html="$t('esports_kpl10')"></p>
        <div class="award-list">
          <div class="award flex">
            <p class="award-left">PRIZE POOL</p>
            <p class="award-right" v-if="kplinfo[showkplindex]">{{$t('esports_kpl11')}} <span>{{kplinfo[showkplindex].curRewardPool}} BUSD</span></p>
          </div>
          <div class="award flex">
            <p class="award-left" style="font-size:20px;">BATTLE REWARD</p>
            <p class="award-right" v-if="kplinfo[showkplindex]">{{$t('esports_kpl12')}} <span>{{kplinfo[showkplindex].curRewardPool}}U</span> {{$t('esports_kpl13')}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 排行 -->
    <div class="kpl-ranking margin-auto">
      <div class="rank-header flex">
        <p>{{$t('esports_kpl14')}}</p>
        <button>{{$t('esports_kpl15')}}</button>
      </div>
      <div class="rank-list flex">
        <div class="ranking" v-for="(item,index) in kpllist" :key="index">
          <p>{{$t('esports_kpl15_jia')}}NO.{{index}}</p>
          <img :src="item.imgUrl ? item.imgUrl :'/kpl/headerBanner.png'" alt="">
        </div>
      </div>
      <button class="ranking-more">{{$t('esports_kpl15_jia2')}}</button>
    </div>
    <!-- 规则 -->
    <div class="kpl-rules margin-auto">
      <h5 v-html="$t('esports_kpl16')"></h5>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p v-html="$t('esports_kpl17')"></p>
      <button>{{$t('esports_kpl16_jia1')}}</button>
      <div class="rules-img flex">
        <img src="/kpl/rules01.png" alt="">
        <img src="/kpl/rules02.png" alt="">
        <img src="/kpl/rules03.png" alt="">
      </div>
    </div>
    <!-- 面具 -->
    <div class="kpl-mask">
      <div class="mask-header margin-auto">
        <p>{{$t('esports_kpl17_jia1')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <button>{{$t('esports_kpl17_jia2')}}</button>
      </div>
      <div class="kpl-banner banner-01"></div>
      <div class="kpl-banner banner-02"></div>
    </div>
    <!-- 赛程 -->
    <div class="kpl-schedule margin-auto">
      <div class="schedule-header">
        <p class="schedule-title">{{$t('esports_kpl18')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p class="schedule-time">{{$t('esports_kpl19')}}</p>
      </div>
      <div class="schedule-expect">{{$t('esports_kpl21')}}</div>
    </div>
    <!-- 预告 -->
    <div class="kpl-notice kpl-notice-header margin-auto">
      <div class="notice-header flex">
        <img class="up-next" src="/kpl/up.png" alt="">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl22')}}{{$t('esports_kpl23')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <img class="up-next" src="/kpl/next.png" alt="">
      </div>
    </div>
    <div class="kpl-notice kpl-notice-bgi  margin-auto">
      <div class="notice-team margin-auto flex">
        <div class="team">
          <div class="team-top flex">
            <div class="team-header flex" v-if="kplinfo[showkplindex]">  
              <img v-for="item in kplinfo[showkplindex].teamAMemberUrl" :src="item" :key="item ? item : '/kpl/header.png'" alt="">
            </div>
            <div class="team-name team-a">
              <!-- 放置战队logo -->
              <img v-if="kplinfo[showkplindex]" :src="kplinfo[showkplindex].teamAUrl" alt="">
            </div>
          </div>
          <div class="team-ranking">
            <div class="ranking-user flex" v-if="kplinfo[showkplindex]">
              <img v-for="item in kplinfo[showkplindex].attaMatchOptions[0].betRecord" :src="item.imgUrl" :key="item" alt="">
              <p>{{kplinfo[showkplindex].attaMatchOptions[0].betRecord.length}}</p>
            </div>
          </div>
          <button class="margin-auto">{{$t('esports_kpl24')}}</button>
        </div>
        <div class="team">
          <div class="team-top flex">
            <div class="team-name team-b">
              <!-- 放置战队logo -->
              <img v-if="kplinfo[showkplindex]" :src="kplinfo[showkplindex].teamBUrl" alt="">
            </div>
            <div class="team-header flex" v-if="kplinfo[showkplindex]">  
              <img v-for="item in kplinfo[showkplindex].teamBMemberUrl" :src="item" :key="item ? item : '/kpl/header.png'" alt="">
            </div>
          </div>
          <div class="team-ranking">
            <div class="ranking-user flex" v-if="kplinfo[showkplindex]">
              <img v-for="item in kplinfo[showkplindex].attaMatchOptions[1].betRecord" :src="item.imgUrl" :key="item" alt="">
              <p>{{kplinfo[showkplindex].attaMatchOptions[1].betRecord.length}}</p>
            </div>
          </div>
          <button class="margin-auto">{{$t('esports_kpl24')}}</button>
        </div>
      </div>
    </div>
    <div class="kpl-notice margin-auto">
      <div class="notice-btn margin-auto flex">
        <p v-if="kplinfo[showkplindex]">{{$t('esports_kpl25')}}{{kplinfo[showkplindex].myUnuseTicket}}{{$t('esports_kpl26')}}</p>
        <div>
          <button>{{$t('esports_kpl27')}}</button>
          <button class="btn-right">{{$t('esports_kpl28')}}</button>
        </div>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="kpl-countdown">
      <p class="countdown-name">投票截止倒计时</p>
      <p class="countdown-date">156h:56m:23s</p>
      <p class="countdown-name">比赛开始时间</p>
      <p class="countdown-date">8月xx日 14:00</p>
    </div>
    <!-- 奖池 -->
    <div class="kpl-award kpl-title margin-auto">
      <h5 v-if="kplinfo[showkplindex]">{{$t('esports_kpl29')}} {{kplinfo[showkplindex].curRewardPool}} BUSD</h5>
      <div class="kpl-award-team flex" v-if="kplinfo[showkplindex]">
        <div class="award-team">
          <h5>{{kplinfo[showkplindex].teamA}}</h5>
          <p>{{$t('esports_kpl31')}}{{kplinfo[showkplindex].attaMatchOptions[0].totalTickets}}{{$t('esports_kpl32')}}</p>
          <p>{{$t('esports_kpl33')}}{{kplinfo[showkplindex].attaMatchOptions[0].rewardForSingle}} BUSD</p>
        </div>
        <div class="award-team">
          <h5>{{kplinfo[showkplindex].teamB}}</h5>
          <p>{{$t('esports_kpl31')}}{{kplinfo[showkplindex].attaMatchOptions[1].totalTickets}}{{$t('esports_kpl32')}}</p>
          <p>{{$t('esports_kpl33')}}{{kplinfo[showkplindex].attaMatchOptions[1].rewardForSingle}} BUSD</p>
        </div>
      </div>
    </div>
    <!-- 投票排行 -->
    <div class="kpl-voting-ranking kpl-title margin-auto">
      <h5>{{$t('esports_kpl35')}}</h5>
      <div class="voting-ranking flex" v-if="kplinfo[showkplindex]">
        <div class="voting-ranking-list">
          <div class="ranking-bumber flex" v-for="item in kplinfo[showkplindex].attaMatchOptions[0].betTop3" :key="item">
            <img :src="'/kpl/No'+item.pm+'.png'" alt="">
            <img :src="item.imgUrl ? item.imgUrl :'/kpl/header.png'" alt="">
            <div>
              <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
        </div>
        <div class="voting-ranking-list">
          <div class="ranking-bumber flex" v-for="item in kplinfo[showkplindex].attaMatchOptions[1].betTop3" :key="item">
            <img :src="'/kpl/No'+item.pm+'.png'" alt="">
            <img :src="item.imgUrl ? item.imgUrl :'/kpl/header.png'" alt="">
            <div>
              <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NFT奖励 -->
    <div class="kpl-nft kpl-title margin-auto">
      <h5>{{$t('esports_kpl36')}}</h5>
      <div class="nft-list flex" v-if="kplinfo[showkplindex]">
        <div class="nft-content flex" v-for="(item,index) in kplinfo[showkplindex].voteReward" :key="item">
          <div>
            <p class="nft-from">{{item.title}}</p>
            <p class="nft-award">{{item.content}}</p>
            <p class="nft-win">{{item.type ? '敗方投票NO.1' : '勝方投票NO.'+(index + 1)}}</p>
          </div>
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
    </div>
    <!-- 我的投票 -->
    <div class="kpl-my-voting kpl-title margin-auto">
      <h5>{{$t('esports_kpl43')}}</h5>
      <div class="my-voting flex" v-if="kplinfo[showkplindex]">
        <div class="voting">
          <p class="voting-name">{{$t('esports_kpl43')}}({{kplinfo[showkplindex].teamA}})</p>
          <div class="ranking-bumber flex">
            <img src="/kpl/No1.png" alt="">
            <img :src="kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.imgUrl ? kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.imgUrl :'/kpl/header.png'" alt="">
            <div>
              <p>{{kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
          <p class="voting-award">{{$t('esports_kpl44')}}{{kplinfo[showkplindex].attaMatchOptions[0].myReward}} BUSD</p>
          <p class="voting-remark">{{$t('esports_kpl45')}}</p>
        </div>
        <div class="voting" >
          <p class="voting-name">{{$t('esports_kpl43')}}({{kplinfo[showkplindex].teamB}})</p>
          <div class="ranking-bumber flex">
            <img src="/kpl/No1.png" alt="">
            <img :src="kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.imgUrl ? kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.imgUrl :'/kpl/header.png'" alt="">
            <div>
              <p>{{kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
          <p class="voting-award">{{$t('esports_kpl44')}}{{kplinfo[showkplindex].attaMatchOptions[1].myReward}} BUSD</p>
          <p class="voting-remark">{{$t('esports_kpl45')}}</p>
        </div>
      </div>
    </div>
    <!-- 投票规则 -->
    <div class="kpl-voting-rules kpl-title flex margin-auto">
      <h5>{{$t('esports_kpl46')}}</h5>
      <div class="kpl-rules">
        <p v-html="$t('esports_kpl47')"></p>
      </div>
    </div>
    <!-- 大会合作伙伴 -->
    <div class="kpl-cooperate margin-auto">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl48')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="cooperate-list flex">
        <div class="cooperate flex">
          <div class="cooperate-logo">
            <img src="/kpl/test.png" alt="">
          </div>
          <div class="cooperate-info">
            <p class="cooperate-title">{{$t('esports_kpl49')}}</p>
            <i></i>
            <p class="cooperate-text">{{$t('esports_kpl50')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./kpl.ts"></script>
<style>
html{
  min-width: 1440px;
  overflow-x: auto;
}
@media only screen and (max-width: 992px){
  
html{
  min-width: 100% !important;
  overflow-x: auto;
}
}
</style>
<style scoped lang='scss'>
@import "./kpl.scss";
</style>