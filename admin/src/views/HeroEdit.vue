<template>
	<div>
		<h1>{{ title }}英雄</h1>
		<el-form label-width="100px" @submit.native.prevent="save">
			<el-tabs value="basic" type="border-card">
				<el-tab-pane label="基础信息" name="basic">
					<el-form-item label="名称">
						<el-input v-model.trim="model.name"></el-input>
					</el-form-item>

					<el-form-item label="称号">
						<el-input v-model.trim="model.title"></el-input>
					</el-form-item>

					<el-form-item label="头像">
						<el-upload
							:limit="1"
							class="avatar-uploader"
							drag
							multiple
							:action="$http.defaults.baseURL + '/upload'"
							:on-success="afterUpload"
							:on-exceed="onHint"
							:headers="addToken"
							:on-change="onChange"
						>
							<img v-if="model.portrait" class="avatar" :src="model.portrait" :alt="model.name" />
							<div v-else>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将图片拖到此处，或<em>点击此处选择文件</em><br /></div>
							</div>
						</el-upload>
					</el-form-item>

					<el-form-item label="英雄背景">
						<el-upload
							:limit="1"
							class="avatar-uploader"
							drag
							multiple
							:action="$http.defaults.baseURL + '/upload'"
							:on-success="(res) => $set(model, 'banner', res.url)"
							:on-exceed="onHint"
							:headers="addToken"
							:on-change="(file) => (model.title = file.name.split('.')[0])"
						>
							<img v-if="model.banner" class="avatar" :src="model.banner" :alt="model.name" />
							<div v-else>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将图片拖到此处，或<em>点击此处选择文件</em><br /></div>
							</div>
						</el-upload>
					</el-form-item>

					<el-form-item label="类型">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item of categories" :label="item.name" :value="item._id" :key="item._id"> </el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="难度">
						<el-rate :max="10" show-score v-model.number="model.scores.difficult" style="margin-top: 10px"> </el-rate>
					</el-form-item>

					<el-form-item label="技能">
						<el-rate :max="10" show-score v-model.number="model.scores.skills" style="margin-top: 10px"> </el-rate>
					</el-form-item>

					<el-form-item label="攻击">
						<el-rate :max="10" show-score v-model.number="model.scores.attack" style="margin-top: 10px"> </el-rate>
					</el-form-item>

					<el-form-item label="生存">
						<el-rate :max="10" show-score v-model.number="model.scores.survive" style="margin-top: 10px"> </el-rate>
					</el-form-item>

					<el-form-item label="顺风出装">
						<el-select v-model="model.items1" multiple>
							<el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"> </el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="逆风出装">
						<el-select v-model="model.items2" multiple>
							<el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"> </el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="使用技巧">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>

					<el-form-item label="对抗技巧">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>

					<el-form-item label="团长技巧">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				</el-tab-pane>

				<el-tab-pane label="技能" name="skills">
					<el-button plain size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能 </el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<el-col :md="12" v-for="(item, index) in model.skills" :key="index" style="margin-bottom: 20px">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									:limit="1"
									class="avatar-uploader"
									:show-file-list="false"
									:action="$http.defaults.baseURL + '/upload'"
									:headers="addToken"
									:on-success="(res) => $set(item, 'icon', res.url)"
									:on-exceed="onHint"
									:on-change="(file) => (item.name = file.name.split('.')[0])"
								>
									<img v-if="item.icon" class="avatar icon" :src="item.icon" :alt="item.name" />
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="冷却值">
								<el-input type="textarea" v-model="item.delay"></el-input>
							</el-form-item>
							<el-form-item label="消耗">
								<el-input type="textarea" v-model="item.cost"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input type="textarea" v-model="item.tips"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>

				<el-tab-pane label="最佳搭档" name="partners">
					<el-button plain size="small" @click="model.partners.push({})"> <i class="el-icon-plus"></i>添加英雄 </el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<el-col :md="12" v-for="(item, index) in model.partners" :key="index" style="margin-bottom: 20px">
							<el-form-item label="英雄">
								<el-select v-model="item.hero"  filterable>
									<el-option 
                                        v-for="hero in heroes" 
                                        :key="hero._id" 
                                        :value="hero._id" 
                                        :label="hero.name"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="描述">
								<el-input type="textarea" v-model.trim="item.description"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger" @click="model.partners.splice(index, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>

			<el-form-item style="margin-top: 1rem">
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "HeroEdit",
	props: ["id"],
	data() {
		return {
			categories: [],
			items: [],
			model: {
				name: "",
				portrait: "",
				scores: {},
				skills: [],
				partners: [],
				heroes: [],
				banner: "",
			},
		};
	},
	methods: {
		afterUpload(res) {
			this.$set(this.model, "portrait", res.url);
		},
		onHint() {
			this.$message({
				type: "warning",
				message: "不支持多图片上传哦！",
			});
		},
		onChange(file) {
			this.model.name = file.name.split(".")[0];
		},

		async save() {
			if (this.id) {
				await this.$http.put(`/rest/heroes/${this.id}`, this.model);
			} else {
				await this.$http.post("/rest/heroes", this.model);
			}
			// 函数式路由跳转
			this.$router.push("/heroes/list");
			// element赠送功能...
			this.$message({
				type: "success",
				message: `"${this.model.name}"信息保存成功！`,
			});
		},
		async fetch() {
			const res = await this.$http.get(`/rest/heroes?id=${this.id}`);
			this.model = {
				...this.model,
				...res.data,
			};
		},
		async fetchCategories() {
			const res = await this.$http.get("/rest/categories");
			this.categories = res.data;
		},
		async fetchItems() {
			const res = await this.$http.get(`/rest/items`);
			this.items = res.data;
		},
        async fetchHeroes() {
			const res = await this.$http.get(`/rest/heroes`);
			this.heroes = res.data;
		},
	},
	computed: {
		title() {
			return this.id ? "编辑" : "新建";
		},
	},
	created() {
		this.fetchCategories();
		this.fetchItems();
		this.id && this.fetch();
        this.fetchHeroes();
	},
};
</script>

<style scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
	border: 1px dashed #d9d9d9;
}

.avatar {
	width: 178px;
	height: 178px;
	margin: 0 auto;
	display: block;
}

.icon {
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
}
</style>
