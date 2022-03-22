<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='220'></el-table-column>
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <img class="icon" :src="scope.row.icon" :alt="scope.row.name">                    
                </template>
            </el-table-column>
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'ItemList',
        data() {
            return {
                items: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/items');
                this.items = res.data;
            },
            async del(row) {
                this.$confirm(`是否要删除"${row.name}"物品？`, '💖提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/rest/items/${row._id}`);
                        this.$message({
                            type: 'success',
                            message: `"${row.name}"物品删除成功！`
                        })
                        this.fetch();
                    } catch (error) {
                        this.$message({
                            type: 'error',
                            message: `"${row.name}"物品删除错误，请稍后再试！`
                        })
                    }
                })
            },
            edit(id) {
                this.$router.push(`/items/edit/${id}`);
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style scoped>
    .icon{
        width: 50px;
        height: 50px;
    }
</style>