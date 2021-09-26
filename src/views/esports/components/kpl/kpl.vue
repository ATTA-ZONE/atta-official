<template>
<!-- banner部分 -->
  <div class="kpl" :class="isEn?'kpl-en':''" v-loading="loading">
    <div class="banner-container">
      <div class="banner-info">
        <img src="/kpl/titleCh.png" />
        <div class="kpl-time">{{$t('esports_kpl1')}}</div>
        <div class="kpl-team" v-if="kplinfo[showkplindex]">{{kplinfo[showkplindex].teamA + ' VS ' + kplinfo[showkplindex].teamB}}</div>
        <div class="kpl-btn flex"> 
          <span @click="scrollviewbtn" :class="isEn?'kpl-btn-en':''">{{$t('esports_kpl3')}}</span>
          <a href="https://live.bilibili.com/23397839" target="_blank" :class="isEn?'kpl-btn-en':''">{{$t('esports_kpl4')}}</a>
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
          <h5 :class="isEn?'kpl-welcome-en':''">{{$t('esports_kpl8')}}</h5>
        </div>
      </div>
      <div class="prize-pool">
        <h5>{{$t('esports_kpl9')}}</h5>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p v-html="$t('esports_kpl10')"></p>
        <div class="award-list">
          <div class="award flex">
            <p class="award-left">
              <img class="prizePool" src="/kpl/prizePool.png" alt="">
            </p>
            <p class="award-right" :class="isEn?'award-right-en':''">{{$t('esports_kpl11')}} <span>3000 BUSD{{$t('esports_kpl11en')}}</span></p>
          </div>
          <div class="award flex">
            <p class="award-left">
              <img class="battleRewaro" src="/kpl/BATTLEREWARD.png" alt="">
            </p>
            <p class="award-right award-right-en-ch" v-if="!isEn">{{$t('esports_kpl12')}} <span>100,000U</span> {{$t('esports_kpl13')}} <span>NFT</span>+<span>{{$t('esports_kpl13_jia')}}</span></p>
            <p class="award-right award-right-en-en" v-if="isEn"><span>{{$t('esports_kpl13')}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 排行 -->
    <div class="kpl-ranking margin-auto">
      <div class="rank-header flex" :class="isEn?'rank-header-en':''">
        <p>{{$t('esports_kpl14')}}</p>
        <button @click="getkplph">{{$t('esports_kpl15')}}</button>
      </div>
      <div class="rank-list flex" :class="isEn?'rank-list-en':''">
        <div class="ranking" v-for="(item,index) in kplpmfour" :key="index">
          <p>{{$t('esports_kpl15_jia')}}NO.{{item.pm}}</p>
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
      <button @click="morerewards" class="ranking-more" :class="isEn?'ranking-more-en':''">{{$t('esports_kpl15_jia2')}}</button>
    </div>
    <!-- 规则 -->
    <div id="kplRules" class="kpl-rules margin-auto" :class="isEn?'kpl-rules-en':''">
      <h5 v-html="$t('esports_kpl16')"></h5>
      <img class="bgi01" src="/kpl/bgi01.png" alt="">
      <p v-html="$t('esports_kpl17')"></p>
      <button @click="exchangemask" style="background: #f1f1f1;color: #000;">{{$t('esports_kpl16_jia1')}}</button>
      <div class="rules-img flex">
        <img src="/kpl/rules01.png" alt="">
        <img src="/kpl/rules02.png" alt="">
        <img src="/kpl/rules03.png" alt="">
      </div>
    </div>
    <!-- 面具 -->
    <div class="kpl-mask" :class="isEn?'kpl-mask-en':''">
      <div class="mask-header margin-auto">
        <p>{{$t('esports_kpl17_jia1')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <button @click="jumppage1">{{$t('esports_kpl17_jia2')}}</button>
      </div>
      <!-- <div class="kpl-banner banner-01"></div> -->
      <img class="kpl-banner banner-01" src="/kpl/mask01.png" alt="">
      <img class="kpl-banner banner-02" src="/kpl/mask02.png" alt="">
      <!-- <div class="kpl-banner banner-02"></div> -->
    </div>
    <!-- 赛程 -->
    <div class="kpl-schedule margin-auto">
      <div class="schedule-header">
        <p class="schedule-title">{{$t('esports_kpl18')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p class="schedule-time">{{$t('esports_kpl19')}}</p>
      </div>
      <div class="schedule-expect">
        <p class="schedule-expect-time">09-25</p>
        <img class="schedule-expect-img" src="/kpl/sport1.png" />
        <p  class="schedule-expect-time">09-26</p>
        <img  class="schedule-expect-img" src="/kpl/sport2.png" />
      </div>
    </div>
    <!-- 预告 -->
    <div class="kpl-notice kpl-notice-header margin-auto">
      <div class="notice-header flex">
        <p :class="showkplindex != 0 ? 'up-next up-up' : 'up-next up-up hideimg'" @click="beforeclick(showkplindex)">{{$t('esports_kpl102')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p v-if="kplinfo[showkplindex]">{{$t(computekpltimeshowword(kplinfo[showkplindex]))}} <span v-if="computekpltimeshowword(kplinfo[showkplindex]) == 'esports_kpl22_jia'">{{isEn?'@':''}} {{formatDate(kplinfo[showkplindex].startTime)}}</span></p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p :class="showkplindex != kplinfo.length - 1 ? 'up-next ' : 'up-next hideimg'" @click="nextclick(showkplindex)">{{$t('esports_kpl103')}}</p>
      </div>
    </div>
    <div class="kpl-notice kpl-notice-bgi  margin-auto" :class="isEn?'kpl-notice-en':''">
      <div class="notice-team margin-auto flex">
        <div class="team">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 1" alt="">
          <div class="team-top flex">
            <div class="team-header flex" v-if="kplinfo[showkplindex]">  
              <img v-for="item in kplinfo[showkplindex].teamAMemberUrl" :src="formatVideoUrl(item)" :key="item ? formatVideoUrl(item) : '/kpl/header.png'" alt="">
            </div>
            <div class="team-name team-a">
              <!-- 放置战队logo -->
              <img v-if="kplinfo[showkplindex]" :src="formatVideoUrl(kplinfo[showkplindex].teamAUrl)" alt="">
            </div>
          </div>
          <div class="team-ranking">
            <div class="ranking-user flex">
              <img v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length && kplinfo[showkplindex].attaMatchOptions[0].betRecord.length" v-for="item in kplinfo[showkplindex].attaMatchOptions[0].betRecord" :src="item.imgUrl ? formatVideoUrl(item.imgUrl) : '/kpl/header.png'" :key="item" alt="">
              <p v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length && kplinfo[showkplindex].attaMatchOptions[0].totalVoteTicket >= 5">{{kplinfo[showkplindex].attaMatchOptions[0].totalVoteTicket}}</p>
            </div>
          </div>
          <button class="margin-auto" @click="voteclick(kplinfo[showkplindex].myUnuseTicket,kplinfo[showkplindex].attaMatchOptions[0].id)">{{$t('esports_kpl24')}}</button>
        </div>
        <div class="team">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 2" alt="">
          <div class="team-top flex">
            <div class="team-name team-b">
              <!-- 放置战队logo -->
              <img v-if="kplinfo[showkplindex]" :src="formatVideoUrl(kplinfo[showkplindex].teamBUrl)" alt="">
            </div>
            <div class="team-header flex" v-if="kplinfo[showkplindex]">  
              <img v-for="item in kplinfo[showkplindex].teamBMemberUrl" :src="formatVideoUrl(item)" :key="item ? item : '/kpl/header.png'" alt="">
            </div>
          </div>
          <div class="team-ranking">
            <div class="ranking-user flex">
              <img v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length && kplinfo[showkplindex].attaMatchOptions[1].betRecord.length" v-for="item in kplinfo[showkplindex].attaMatchOptions[1].betRecord" :src="item.imgUrl ? formatVideoUrl(item.imgUrl) : '/kpl/header.png'" :key="item" alt="">
              <p v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length && kplinfo[showkplindex].attaMatchOptions[1].totalVoteTicket >=
               5">{{kplinfo[showkplindex].attaMatchOptions[1].totalVoteTicket}}</p>
            </div>
          </div>
          <button class="margin-auto" @click="voteclick(kplinfo[showkplindex].myUnuseTicket,kplinfo[showkplindex].attaMatchOptions[1].id)">{{$t('esports_kpl24')}}</button>
        </div>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="kpl-countdown margin-auto flex" :class="isEn?'kpl-countdown-en':''" v-if="kplbsstatus == 2">
      <p class="countdown-name">{{$t('esports_kpl67')}}</p>
      <p class="countdown-date hanson" v-if="!kplinfo[showkplindex].voteStartTime && !kplinfo[showkplindex].voteEndTime">TBD</p>
      <p class="countdown-date hanson" v-if="kplinfo[showkplindex].curTime < kplinfo[showkplindex].voteStartTime ">{{hour}}h:{{minute}}m:{{second}}s</p>
      <p class="countdown-date hanson" v-if="kplinfo[showkplindex].curTime > kplinfo[showkplindex].voteStartTime && kplinfo[showkplindex].curTime < kplinfo[showkplindex].voteEndTime">{{$t('voteOver2')}}</p>
      <p class="countdown-date hanson" v-if="kplinfo[showkplindex].curTime > kplinfo[showkplindex].voteEndTime">{{$t('voteOver')}}</p>
    </div>
    <div class="kpl-notice margin-auto" :class="isEn?'kpl-notice-en':''">
      <div class="notice-btn margin-auto flex">
        <div class="notice-left flex">
          <p :class="showkplindex != 0 ? 'up-next up-up hidepc' : 'up-next up-up hidepc hideimg'" @click="beforeclick(showkplindex)">{{$t('esports_kpl102')}}</p>

          <p v-if="kplinfo[showkplindex]">{{$t('esports_kpl25')}}{{kplinfo[showkplindex].myUnuseTicket}}{{$t('esports_kpl26')}}</p>
          
          <p :class="showkplindex != kplinfo.length - 1 ? 'up-next hidepc' : 'up-next hidepc hideimg'" @click="nextclick(showkplindex)">{{$t('esports_kpl103')}}</p>
        </div>
        <div class="notice-right">
          <button @click="collectcouponsbtn">{{$t('esports_kpl27')}}</button>
          <button @click="toPay" class="btn-right">{{$t('esports_kpl28')}}</button>
        </div>
      </div>
    </div>
    <!-- 奖池 -->
    <div class="kpl-award kpl-title margin-auto">
      <h5 v-if="isEn && kplinfo[showkplindex]" style="text-align:center;">{{$t('esports_kpl29')}}<br/> {{kplinfo[showkplindex].curRewardPool}} BUSD</h5>
      <h5 v-if="!isEn && kplinfo[showkplindex]" style="text-align:center;">{{$t('esports_kpl29')}}{{kplinfo[showkplindex].curRewardPool}} BUSD</h5>
      <div class="kpl-award-team flex" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length">
        <div class="award-team">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 1" alt="">
          <h5>{{kplinfo[showkplindex].teamA}}</h5>
          <p>{{$t('esports_kpl31')}}{{kplinfo[showkplindex].attaMatchOptions[0].totalTickets}}{{$t('esports_kpl32')}}</p>
          <p>{{$t('esports_kpl33')}}{{kplinfo[showkplindex].attaMatchOptions[0].rewardForSingle}} BUSD</p>
        </div>
        <div class="award-team">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 2" alt="">
          <h5>{{kplinfo[showkplindex].teamB}}</h5>
          <p>{{$t('esports_kpl31')}}{{kplinfo[showkplindex].attaMatchOptions[1].totalTickets}}{{$t('esports_kpl32')}}</p>
          <p>{{$t('esports_kpl33')}}{{kplinfo[showkplindex].attaMatchOptions[1].rewardForSingle}} BUSD</p>
        </div>
      </div>
    </div>
    <!-- 投票排行 -->
    <div class="kpl-voting-ranking kpl-title margin-auto">
      <h5>{{$t('esports_kpl35')}}</h5>
      <div class="voting-ranking flex" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length">
        <div class="voting-ranking-list">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 1" alt="">
          <div class="ranking-bumber flex" v-for="item in kplinfo[showkplindex].attaMatchOptions[0].betTop3" :key="item">
            <img :src="'/kpl/No'+item.pm+'.png'" alt="">
            <img :src="item.imgUrl ? formatVideoUrl(item.imgUrl) :'/kpl/header.png'" alt="">
            <div>
              <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[0].betTop3.length < 1">
            <img :src="'/kpl/No1.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[0].betTop3.length < 2">
            <img :src="'/kpl/No2.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[0].betTop3.length < 3">
            <img :src="'/kpl/No3.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
        </div>
        <div class="voting-ranking-list">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 2" alt="">
          <div class="ranking-bumber flex" v-for="item in kplinfo[showkplindex].attaMatchOptions[1].betTop3" :key="item">
            <img :src="'/kpl/No'+item.pm+'.png'" alt="">
            <img :src="item.imgUrl ? formatVideoUrl(item.imgUrl) :'/kpl/header.png'" alt="">
            <div>
              <p>{{item.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[1].betTop3.length < 1">
            <img :src="'/kpl/No1.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[1].betTop3.length < 2">
            <img :src="'/kpl/No2.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[1].betTop3.length < 3">
            <img :src="'/kpl/No3.png'" alt="">
            <img src="/kpl/header.png" alt="">
            <div>
              <p>{{$t('esports_kpl32_jia')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NFT奖励 -->
    <div class="kpl-nft kpl-title margin-auto" :class="isEn?'kpl-nft-en':''">
      <h5>{{$t('esports_kpl36')}}</h5>
      <p>{{$t('esports_kpl64')}}</p>
      <div class="nft-list flex" v-if="kplinfo[showkplindex]">
        <div class="nft-content flex" v-for="(item,index) in kplinfo[showkplindex].voteReward" :key="item">
          <div>
            <p class="nft-from">{{$t('esports_kpl98')}}{{item.title}}{{$t('esports_kpl99')}}</p>
            <p class="nft-award">{{item.content}}</p>
            <p class="nft-win">{{item.type ? $t('esports_kpl66') : $t('esports_kpl65')+(index + 1)}}</p>
          </div>
          <img :src="formatVideoUrl(item.imgUrl)" alt="">
        </div>
      </div>
    </div>
    <!-- 我的投票 -->
    <div class="kpl-my-voting kpl-title margin-auto">
      <h5>{{$t('esports_kpl43')}}</h5>
      <div class="my-voting flex" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].attaMatchOptions.length">
        <div class="voting">
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 1" alt="">
          <p class="voting-name">{{$t('esports_kpl43')}}({{kplinfo[showkplindex].teamA}})</p>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket">
            <img src="/kpl/attaLOGO.png" alt="">
            <img :src="kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.imgUrl ? formatVideoUrl(kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.imgUrl) :'/kpl/header.png'" alt="">
            <div>
              <p>{{kplinfo[showkplindex].attaMatchOptions[0].myVoteTicket.tickets}}{{$t('esports_kpl32')}}</p>
            </div>
          </div>
          <p class="voting-award">{{$t('esports_kpl44')}}{{kplinfo[showkplindex].attaMatchOptions[0].myReward}} BUSD</p>
          <p class="voting-remark">{{$t('esports_kpl45')}}</p>
        </div>
        <div class="voting" >
          <img class="winimg" src="/kpl/winimg.png" v-if="kplinfo[showkplindex] && kplinfo[showkplindex].result == 2" alt="">
          <p class="voting-name">{{$t('esports_kpl43')}}({{kplinfo[showkplindex].teamB}})</p>
          <div class="ranking-bumber flex" v-if="kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket">
            <!-- <span class="pmbgimgbox" :style="kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.pm > 99 ? 'min-width : 60px' : ''">
              <span class="pmbgimg">{{kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.pm}}</span>
            </span> -->
            <img src="/kpl/attaLOGO.png" alt="">
            <img :src="kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.imgUrl ? formatVideoUrl(kplinfo[showkplindex].attaMatchOptions[1].myVoteTicket.imgUrl) :'/kpl/header.png'" alt="">
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
    <div class="kpl-cooperate margin-auto" :class="isEn?'kpl-cooperate-en':''">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl48')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="cooperate-list flex">
        <div class="cooperate flex" style="margin-right: 55px;">
          <div class="cooperate-logo">
            <img src="/kpl/kpl_img3.png" alt="">
          </div>
          <div class="cooperate-info">
            <p class="cooperate-title">{{$t('esports_kpl49')}}</p>
            <i></i>
            <p class="cooperate-text">{{$t('esports_kpl50')}}</p>
          </div>
        </div>
        <div class="cooperate flex">
          <div class="cooperate-logo">
            <img src="/kpl/kpl_img4.png" alt="">
          </div>
          <div class="cooperate-info">
            <p class="cooperate-title">{{$t('esports_kpl49')}}</p>
            <i></i>
            <p class="cooperate-text">{{$t('esports_kpl50_jia')}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 戰隊陣容 -->
    <div class="kpl-cooperate margin-auto" :class="isEn?'kpl-cooperate-en':''">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl105')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="imgsbox flex">
        <img v-for="item in kplteamlistimgs" :src="item" :key="item" alt="">
      </div>
    </div>
    <!-- 特邀嘉賓 -->
    <div class="kpl-cooperate margin-auto" :class="isEn?'kpl-cooperate-en':''">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl106')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="imgsbox imgsbox2 flex">
          <img v-for="(item,index) in kplteamlistimgs2" :style="index ==  11 ? 'opacity: 0;':'opacity: 1;'" :src="item" :key="item" />
      </div>
    </div>
    <!-- 媒體支持 -->
    <div class="kpl-cooperate margin-auto" :class="isEn?'kpl-cooperate-en':''">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl107')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="sustainbox flex">
        <img v-for="item in kplteamlistimgs3" :key="item" :src="item" alt="">
      </div>
    </div>
    <!-- 更多社區支持 -->
    <div class="kpl-cooperate margin-auto" :class="isEn?'kpl-cooperate-en':''">
      <div class="kpl-welcome flex">
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
        <p>{{$t('esports_kpl108')}}</p>
        <img class="bgi01" src="/kpl/bgi01.png" alt="">
      </div>
      <div class="sustainbox flex">
        <img v-for="item in kplteamlistimgs4" :key="item" :src="item" alt="">
      </div>
    </div>
    <kplRanking :contents="contents" @closeNet="closeNet" @confirmbtn="confirmbtn" v-if="kplRankingshow"></kplRanking>
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
}div.el-loading-mask{
  background-color: rgba(0,0,0,0.8);
}
</style>
<style scoped lang='scss'>
@import "./kpl.scss";
</style>