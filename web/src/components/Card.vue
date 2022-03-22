<template>
	<div id="card">
		<!-- end of nav icons -->
		<div class="card p-3 bg-white mt-3">
			<div class="card-header d-flex ai-center pb-4 pt-3">
				<i :class="`iconfont icon-${icon}`"></i>
				<div class="fs-xl flex-1 px-2">{{ title }}</div>
				<i class="iconfont icon-sandian"></i>
			</div>
			<div class="card-body pt-3">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Card",
	props: {
		title: { type: String, required: true },
		icon: { type: String, required: true },
	},
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.card {
	.card-header {
		border-bottom: 1px solid $border-color;
	}
    border-bottom: 1px solid $border-color;
}
</style>
