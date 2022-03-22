<template>
	<div>
		<swiper :options="swiperOption" :auto-destroy="true">
			<swiper-slide>
				<img class="w-100" src="../assets/images/1.jpeg" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/2.jpeg" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/3.jpeg" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/4.jpeg" alt="" />
			</swiper-slide>
			<swiper-slide>
				<img class="w-100" src="../assets/images/5.jpeg" alt="" />
			</swiper-slide>
			<div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
		</swiper>

		<!-- end of swiper -->
		<div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
			<div class="d-flex flex-wrap">
				<div class="nav-item mb-3" v-for="n in 10" :key="n">
					<i class="sprite sprite-news"></i>
					<div class="py-2">爆料站</div>
				</div>
			</div>
			<div class="bg-light py-2 fs-xl">
				<i class="sprite sprite-arrow mr-1"></i>
				<span class="put">收起</span>
			</div>
		</div>

		<ListCard icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
			<template #items="{ category }">
				<router-link 
					tag="div" 
					:to="`/articles/${news._id}`"
					class="py-2 d-flex fs-lg" 
					v-for="(news, i) in category.newsList" :key="i">
					<span class="text-info">[{{ news.categoryName }}]</span>
					<span class="px-2">|</span>
					<span class="flex-1 text-ellipse pr-2">{{ news.title }}</span>
					<span class="text-grey-1">{{ news.createdAt | filterDate }}</span>
				</router-link>
			</template>
		</ListCard>

		<ListCard icon="card-hero" title="英雄列表" :categories="heroCats">
			<template #items="{ category }">
				<div class="d-flex flex-wrap">
					<router-link 
						tag="div"
						:to="`/heroes/${hero._id}`"
						class="p-2 text-center" 
						style="width:19.9%;"
						v-for="(hero, i) in category.heroList" :key="i">
						<img :src="hero.portrait" :alt="hero.name" class="w-100" />
						<div>{{ hero.name }}</div>
					</router-link>
				</div>
			</template>
		</ListCard>

	
		<Card icon="card-hero" title="精彩时刻"></Card>
	</div>
</template>

<script>
// @ is an alias to /src
import Card from "../components/Card.vue";
import ListCard from "../components/ListCard.vue";
export default {
	name: "Home",
	components: { Card, ListCard },
	data() {
		return {
			newsCats: [
				// {
				// 	name: "热门",
				// 	newsList: new Array(5).fill(1).map((v) => ({
				// 		categoryName: "公告",
				// 		title: "6月2日全服不停机更新公告",
				// 		date: "06/01",
				// 	})),
				// },
				// {
				// 	name: "新闻",
				// 	newsList: new Array(5).fill(1).map((v) => ({
				// 		categoryName: "新闻",
				// 		title: "6月2日全服不停机更新公告",
				// 		date: "06/01",
				// 	})),
				// },
				// {
				// 	name: "公告",
				// 	newsList: new Array(5).fill(1).map((v) => ({
				// 		categoryName: "新闻",
				// 		title: "6月2日全服不停机更新公告",
				// 		date: "06/01",
				// 	})),
				// },
				// {
				// 	name: "活动",
				// 	newsList: new Array(5).fill(1).map((v) => ({
				// 		categoryName: "新闻",
				// 		title: "6月2日全服不停机更新公告",
				// 		date: "06/01",
				// 	})),
				// },
				// {
				// 	name: "赛事",
				// 	newsList: new Array(5).fill(1).map((v) => ({
				// 		categoryName: "新闻",
				// 		title: "6月2日全服不停机更新公告",
				// 		date: "06/01",
				// 	})),
				// },
				// [
				//   { categoryName: "公告", title: "6月2日全服不停机更新公告", date: "06/01" },
				//   { categoryName: "公告", title: "5月30日体验服不停机更新公告", date: "05/30" },
				//   { categoryName: "赛事", title: "决战西安剑指银龙，RNG.M、eStarPr...", date: "05/26" },
				//   { categoryName: "新闻", title: "夏日新版本“稷下星之队即将”6月上线", date: "06/02" },
				//   { categoryName: "新闻", title: "王者荣耀携手两大博物馆 走进稷下学宫", date: "06/02" },
				// ],
			],
			heroCats: [],
			swiperOption: {
				pagination: {
					el: ".pagination-home",
				},
				slidesPerView: 1, // 每次滑动一张
				paginationClickable: true, // 分页可点击
				loop: true, // 循环轮播
				autoplay: {
					// 自动播放
					delay: 2000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
			},
		};
	},
	methods: {
		async fetchNewsCats() {
			const res = await this.$http.get("news/list");
			this.newsCats = res.data;
		},
		async fetchHeroCats() {
			const res = await this.$http.get("heroes/list");
			this.heroCats = res.data;
		},
	},
	filters: {
		filterDate(val) {
			let arr = val.split("T")[0].split("-");
			return arr[1] + "/" + arr[2];
		},
	},
	created() {
		this.fetchNewsCats();
		this.fetchHeroCats();
	},
};
</script>
<style lang="scss">
.put {
	display: inline-block;
	position: relative;
	top: -0.2308rem;
}

@import "../assets/scss/_variables.scss";
.pagination-home {
	.swiper-pagination-bullet {
		opacity: 1;
		border-radius: 0.1538rem;
		background: map-get($colors, "white");
		&.swiper-pagination-bullet-active {
			background: map-get($colors, "info");
		}
	}
}

.nav-icons {
	border-top: 1px solid $border-color;
	border-bottom: 1px solid $border-color;
	.nav-item {
		width: 25%;
		border-right: 1px solid $border-color;
	}
}
</style>
