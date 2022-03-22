<template>
    <div>
        <h1>{{title}}物品</h1>
        <el-form label-width='100px' @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload 
                    :limit='1' 
                    class="avatar-uploader" drag
                    multiple :action="$http.defaults.baseURL + '/upload'" 
                    :headers='addToken'
                    :on-success="afterUpload"
                    :on-exceed='onHint'
                    :on-change='onChange'>
                    <img v-if="model.icon" class="avatar" :src="model.icon" :alt="model.name">
                    <div v-show="!model.icon">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将图片拖到此处，或<em>点击此处选择文件</em><br></div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'ItemEdit',
        props: ['id'],
        data() {
            return {
                model: {},
            }
        },
        methods: {
            async afterUpload(res) {
                this.$set(this.model, 'icon', res.url);
            },
            onHint() {
                this.$message({
                    type: 'warning',
                    message: '不支持多图片上传哦！'
                })
            },
            onChange(file){
                this.$set(this.model, 'name', file.name.split('.')[0]);
            },

            async save() {
                if (this.id) {
                    await this.$http.put(`/rest/items/${this.id}`, this.model);
                } else {
                    await this.$http.post('/rest/items', this.model);
                }
                // 函数式路由跳转
                this.$router.push('/items/list');
                // element赠送功能...
                this.$message({
                    type: 'success',
                    message: `"${this.model.name}"物品保存成功！`
                });
            },
            async fetch() {
                const res = await this.$http.get(`/rest/items?id=${this.id}`);
                this.model = res.data;
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
    }

    .avatar {
        width: 178px;
        height: 178px;
        margin: 0 auto;
        display: block;
    }
</style>