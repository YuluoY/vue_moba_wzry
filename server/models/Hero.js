const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	// 英雄信息
	name: { type: String },
	portrait: { type: String },
	title: { type: String },
	banner: { type: String },
	categories: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Category",
		},
	],
	// 评分信息
	scores: {
		difficult: { type: Number },
		skills: { type: Number },
		attack: { type: Number },
		survive: { type: Number },
	},
	// 技能信息
	skills: [
		{
			icon: { type: String },
			name: { type: String },
			description: { type: String },
			tips: { type: String },
			delay: { type: String },
			cost: { type: String },
		},
	],

	// 推荐出装信息
	// 顺风推荐出装
	items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Items" }],
	// 逆风推荐出装
	items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Items" }],

	// 使用技巧
	usageTips: { type: String },

	// // 对抗技巧
	battleTips: { type: String },

	// // 团队技巧
	teamTips: { type: String },

	// 英雄关系
	heroRelation: [
		{
			hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
			description: { type: String },
		},
	],
});

module.exports = mongoose.model("Hero", schema, "heroes");
