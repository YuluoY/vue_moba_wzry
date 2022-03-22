<template>
    <div>
        <h1>{{title}}文章</h1>
        <el-form label-width='100px' @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model.trim="model.categories" multiple ref="select">
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model.trim="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <Vue-Editor v-model.trim="model.body" useCustomImageHandler @image-added="handleImageAdded">
                </Vue-Editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        VueEditor
    } from 'vue2-editor'
    export default {
        name: 'ArticleEdit',
        props: ['id'],
        components: {
            VueEditor
        },
        data() {
            return {
                model: {},
                categories: []
            }
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
 
                const formData = new FormData();
                formData.append("file", file);

                const res = await this.$http.post('upload', formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },
            async save() {
                if (this.id) {
                    await this.$http.put(`/rest/articles/${this.id}`, this.model);
                } else {
                    await this.$http.post('/rest/articles', this.model);
                }
                // 函数式路由跳转
                this.$router.push('/articles/list');
                // element赠送功能...
                this.$message({
                    type: 'success',
                    message: `"${this.model.title}"文章保存成功！`
                });
            },
            async fetch() {
                const res = await this.$http.get(`/rest/articles?id=${this.id}`);
                this.model = res.data;
            },
            async fetchCategories() {
                const res = await this.$http.get(`/rest/categories`);
                this.categories = res.data;
            },
        },
        computed: {
            title() {
                return this.id ? '编辑' : '新建';
            },
        },
        created() {
            this.fetchCategories();
            this.id && this.fetch()
        }
    }
</script>

<style>

</style>