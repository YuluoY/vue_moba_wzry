<template>
    <div>
        <h1>{{title}}广告位</h1>
        <el-form label-width='100px' @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
            <el-button plain size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告
            </el-button>
            <el-form-item label='广告'>
                <hr>
                <el-row type='flex' style="flex-wrap:wrap;">
                    <el-col :md='22' v-for="(item, index) in model.items" :key="index" style="margin-bottom:20px;">
                        <el-form-item label='跳转链接'>
                            <el-input v-model="item.url" placeholder='请输入URL'></el-input>
                        </el-form-item>
                        <el-form-item label='图片'>
                            <el-upload :limit='1' class="avatar-uploader" :show-file-list="false"
                                :action="$http.defaults.baseURL + '/upload'"
                                :headers='addToken'
                                :on-success="res => $set(item, 'image', res.url)"
                                :on-change='file => item.name = file.name.split(".")[0]'>
                                <img v-if="item.image" class="avatar icon" :src="item.image" :alt="item.name">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size='small' type='danger' @click="model.items.splice(index, 1)">删除</el-button>
                        </el-form-item>
                        <hr>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'AdvertEdit',
        props: ['id'],
        data() {
            return {
                model: {
                    items: []
                },
            }
        },
        methods: {
            async save() {
                if (this.id) {
                    await this.$http.put(`/rest/adverts/${this.id}`, this.model);
                } else {
                    await this.$http.post('/rest/adverts', this.model);
                }
                // 函数式路由跳转
                this.$router.push('/adverts/list');
                // element赠送功能...
                this.$message({
                    type: 'success',
                    message: `"${this.model.name}"广告位保存成功！`
                });
            },
            async fetch() {
                const res = await this.$http.get(`/rest/adverts?id=${this.id}`);
                this.model = {...this.model, ...res.data};
            },
        },
        computed: {
            title() {
                return this.id ? '编辑' : '新建';
            },
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>

<style scoped>
    hr {
        height: 1.4px;
        background-color: silver;
        border: none;
        margin: 10px 0px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
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
        margin-top: 10px;
    }
</style>