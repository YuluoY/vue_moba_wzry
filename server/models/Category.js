const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: {
		type: String,
	},
	parent: {
		// mongoose.Schema.Types.ObjectId
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Category", // 与该文档id关联，即：可以获取分类的id
	},
});

schema.virtual("children", {
	localField: "_id",
	foreignField: "parent",
	justOne: false,
	ref: "Category",
});

schema.virtual("newsList", {
	localField: "_id",
	foreignField: "categories",
	justOne: false,
	ref: "Article",
});

module.exports = mongoose.model("Category", schema);
