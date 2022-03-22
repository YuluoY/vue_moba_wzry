<template>
	<div class="page-hero" v-if="model">
		<div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
			<img src="../assets/logo.png" alt="logo" height="30" />
			<div class="px-2 flex-1">
				<span class="fs-xl pl-2">王者荣耀</span>
				<span class="fx-xxs pl-3">攻略站</span>
			</div>
			<router-link to="/" tag="div">更多英雄 &gt;</router-link>
		</div>
		<div class="top" :style="{ 'background-image': `url(${model.banner})` }">
			<div class="info text-white p-3 h-100 d-flex flex-column jc-end">
				<div class="fs-sm">{{ model.title }}</div>
				<h2 class="my-2">{{ model.name }}</h2>
				<div class="fs-sm">{{ model.categories.map((v) => v.name).join("/") }}</div>
				<div class="d-flex jc-between pt-2">
					<div class="scores" v-if="model.scores">
						<span>难度</span>
						<span class="badge bg-primary">{{ model.scores.difficult }}</span>
						<span>技能</span>
						<span class="badge bg-blue">{{ model.scores.skills }}</span>
						<span>攻击</span>
						<span class="badge bg-danger">{{ model.scores.attack }}</span>
						<span>生存</span>
						<span class="badge bg-dark">{{ model.scores.survive }}</span>
					</div>
					<router-link to="/" tag="span" class="text-grey fs-sm"> 皮肤：3 &gt; </router-link>
				</div>
			</div>
		</div>
		<div class="nav border-bottom pt-4 pb-2 fs-xl">
			<div class="d-flex jc-around">
				<div class="nav-item active">英雄初识</div>
				<div class="nav-item">进阶攻略</div>
			</div>
		</div>
		<div class="d-flex jc-around pt-5 skillsImg">
			<div v-for="(skill, index) in model.skills" :key="index">
				<img :src="skill.icon" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: { require: true },
	},
	data() {
		return {
			model: null,
			heroDetails: ["英雄初识", "进阶攻略"],
			active: 0,
		};
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`heroes/${this.id}`);
			this.model = res.data;
		},
	},
	created() {
		this.fetch();
	},
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.topbar {
	position: sticky; // 顶部导航栏吸顶
	top: 0;
	z-index: 99;
}
.page-hero {
	.top {
		height: 50vw;
		background: #fff no-repeat top center;
		background-size: auto 100%;
	}
	.skillsImg div img{
        &:hover{
            border-radius: 50%;
            border: solid 3px $border-skill-color;
        }
	}
	.scores {
		.badge {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			line-height: 0.9rem;
			text-align: center;
			border-radius: 50%;
			margin-left: 0.7692rem;
			margin-right: 0.7692rem;
			font-size: 0.6rem;
			border: solid 1px rgba(255, 255, 255, 0.3);
		}
	}
	.info {
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
}
</style>
