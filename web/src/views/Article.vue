<template>
	<div class="page-article" v-if="model">
		<div class="d-flex py-3 px-2">
			<i class="iconfont icon-fanhui text-blue" @click.self="$router.push('/')"></i>
			<strong class="flex-1 pl-1 fs-xl text-blue">{{ model.title }}</strong>
			<div class="text-grey fs-xs">2019-06-19</div>
		</div>
		<div v-html="model.body" class="px-3 body fs-lg"></div>
	</div>
</template>

<script>
export default {
	props: {
		id: { required: true },
	},
	data() {
		return {
			model: null,
		};
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`articles/${this.id}`);
			this.model = res.data;
		},
	},
	created() {
		this.fetch();
	},
};
</script>

<style lang="scss">
.page-article {
	.icon-fanhui {
		font-size: 2rem;
	}
	strong {
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.body {
		border-top: solid 1px #d4d9de;
        h1 {
				line-height: 2.6923rem;
			}
		p {
			img {
				max-width: 100%;
				height: auto;
				margin: 0 auto;
			}
		}
		iframe {
			width: 100%;
			height: auto;
		}
	}
}
</style>
