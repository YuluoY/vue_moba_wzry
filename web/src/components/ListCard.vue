<template>
	<Card :icon="icon" :title="title">
		<div class="nav d-flex jc-between">
			<div class="nav-item" 
				:class="{ active: active === i }" 
				v-for="(category, i) in categories" :key="i" 
				@click="$refs.list.$swiper.slideTo(i)">
				<div class="nav-link">{{ category.name }}</div>
			</div>
			<!-- <div class="nav-item">
				<div class="nav-link">新闻</div>
			</div>
			<div class="nav-item">
				<div class="nav-link">公告</div>
			</div>
			<div class="nav-item">
				<div class="nav-link">活动</div>
			</div>
			<div class="nav-item">
				<div class="nav-link">赛事</div>
			</div> -->
		</div>
		<div class="pt-3">
			<swiper ref="list" 
				:options="{autoHeight: true}"
				@slide-change="() => (active = $refs.list.$swiper.activeIndex)">
				<swiper-slide v-for="(category, i) in categories" :key="i">
					<slot name="items" :category="category"></slot>
					<!-- <div class="py-2 d-flex jc-between ai-center" v-for="n in 5" :key="n">
						<span>[新闻]</span>
						<span>|</span>
						<span>测试标题测试标题测试标题测试标题测试标题...</span>
						<span class="text-grey-1">06/02</span>
					</div> -->
				</swiper-slide>
			</swiper>
		</div>
	</Card>
</template>

<script>
import Card from "../components/Card.vue";
export default {
	name: "ListCard",
	components: { Card },
	props: {
		title: { type: String, required: true },
		icon: { type: String, required: true },
		categories: { type: Array, required: true },
	},
	data() {
		return {
			active: 0,
		};
	},
};
</script>

<style></style>
