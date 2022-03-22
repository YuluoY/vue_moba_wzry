module.exports = (app) => {
	const router = require("express").Router();
	const mongoose = require("mongoose");
	// const News = require('../../models/Article');
	const Article = mongoose.model("Article");
	const Hero = mongoose.model("Hero");
	const Category = mongoose.model("Category");

	// 导入新闻数据
	router.get("/news/init", async (req, res) => {
		const parent = await Category.findOne({ name: "新闻分类" });
		const cats = await Category.find().where({ parent: parent }).lean();
		const newsTitles = [
			"元歌皮肤设计大赛精彩创意赏析第四期\n新一期的元歌未来“时装秀”准时和大家见面啦！ 快来看看有哪些新作品呀~",
			"公告12月31日抢先服版本更新公告",
			"活动新年到！众多王者福利陪你畅玩元旦",
			"热门狄某有话说 |2021年度数据总结，还有礼物送上",
			"公告12月28日全服不停机更新公告",
			"热门元歌皮肤设计大赛精彩创意赏析第三期",
			"热门狄某有话说 |百里守约：宝石真好看，我也买两个",
			"热门末日机甲优化 & 祈雪灵祝海报优化 & 乞巧织情海报细节优化【老亚瑟的答疑】",
		];
		const newsList = newsTitles.map((title) => {
			const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
			return {
				categories: randomCats.slice(0, 2),
				title: title,
			};
		});
		await Article.deleteMany({});
		await Article.insertMany(newsList);
		res.send(newsList);
	});

	// 新闻接口
	router.get("/news/list", async (req, res) => {
		// const parent = await Category.findOne({
		// 	name: "新闻分类",
		// }).populate({
		// 	path: "children",
		// 	populate: {
		// 		path: "newsList",
		// 	},
		// }).lean();
		const parent = await Category.findOne({
			name: "新闻分类",
		});
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			{
				$lookup: {
					from: "articles",
					localField: "_id",
					foreignField: "categories",
					as: "newsList",
				},
			},
			{
				$addFields: {
					newsList: { $slice: ["$newsList", 5] },
				},
			},
		]);
		const subCats = cats.map((v) => v._id);
		cats.unshift({
			name: "热门",
			newsList: await Article.find()
				.where({
					categories: { $in: subCats },
				})
				.populate("categories")
				.limit(5)
				.lean(),
		});
		cats.map((cat) => {
			cat.newsList.map((news) => {
				news.categoryName = cat.name === "热门" ? news.categories[0].name : cat.name;
				return news;
			});
			return cat;
		});
		res.send(cats);
	});

	// 导入英雄数据
	router.get("/heroes/init", async (req, res) => {
		const rawData = [
			{
				heroCategory: "坦克",
				heroes: [
					{ name: "阿古朵", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg" },
					{ name: "蒙恬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" },
					{ name: "猪八戒", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" },
					{ name: "嫦娥", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" },
					{ name: "盾山", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" },
					{ name: "孙策", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" },
					{ name: "梦奇", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" },
					{ name: "苏烈", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" },
					{ name: "铠", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
					{ name: "东皇太一", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" },
					{ name: "太乙真人", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" },
					{ name: "张飞", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" },
					{ name: "牛魔", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" },
					{ name: "亚瑟", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
					{ name: "刘邦", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" },
					{ name: "程咬金", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" },
					{ name: "项羽", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" },
					{ name: "达摩", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" },
					{ name: "夏侯惇", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" },
					{ name: "吕布", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" },
					{ name: "芈月", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" },
					{ name: "白起", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" },
					{ name: "钟无艳", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" },
					{ name: "刘禅", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" },
					{ name: "庄周", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" },
					{ name: "廉颇", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" },
				],
			},
			{
				heroCategory: "战士",
				heroes: [
					{ name: "云缨", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg" },
					{ name: "司空震", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg" },
					{ name: "夏洛特", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg" },
					{ name: "蒙恬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" },
					{ name: "马超", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" },
					{ name: "曜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" },
					{ name: "云中君", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" },
					{ name: "盘古", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" },
					{ name: "李信", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" },
					{ name: "孙策", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" },
					{ name: "狂铁", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" },
					{ name: "裴擒虎", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" },
					{ name: "梦奇", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" },
					{ name: "苏烈", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" },
					{ name: "铠", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
					{ name: "哪吒", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" },
					{ name: "雅典娜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" },
					{ name: "杨戬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" },
					{ name: "刘备", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" },
					{ name: "孙悟空", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
					{ name: "亚瑟", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
					{ name: "橘右京", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" },
					{ name: "花木兰", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" },
					{ name: "露娜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" },
					{ name: "程咬金", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" },
					{ name: "关羽", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" },
					{ name: "老夫子", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" },
					{ name: "达摩", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" },
					{ name: "宫本武藏", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" },
					{ name: "典韦", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" },
					{ name: "曹操", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" },
					{ name: "夏侯惇", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" },
					{ name: "吕布", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" },
					{ name: "钟无艳", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" },
					{ name: "墨子", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" },
					{ name: "赵云", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" },
				],
			},
			{
				heroCategory: "刺客",
				heroes: [
					{ name: "云缨", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg" },
					{ name: "澜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg" },
					{ name: "镜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" },
					{ name: "马超", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" },
					{ name: "云中君", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" },
					{ name: "上官婉儿", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" },
					{ name: "司马懿", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" },
					{ name: "元歌", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" },
					{ name: "裴擒虎", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" },
					{ name: "百里玄策", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" },
					{ name: "百里守约", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" },
					{ name: "孙悟空", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
					{ name: "橘右京", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" },
					{ name: "娜可露露", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" },
					{ name: "不知火舞", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" },
					{ name: "花木兰", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" },
					{ name: "兰陵王", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" },
					{ name: "韩信", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" },
					{ name: "貂蝉", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" },
					{ name: "李白", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" },
					{ name: "阿轲", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" },
					{ name: "赵云", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" },
				],
			},
			{
				heroCategory: "法师",
				heroes: [
					{ name: "金蝉", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg" },
					{ name: "司空震", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg" },
					{ name: "西施", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" },
					{ name: "嫦娥", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" },
					{ name: "上官婉儿", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" },
					{ name: "沈梦溪", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" },
					{ name: "司马懿", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" },
					{ name: "米莱狄", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" },
					{ name: "弈星", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" },
					{ name: "杨玉环", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" },
					{ name: "女娲", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" },
					{ name: "干将莫邪", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" },
					{ name: "诸葛亮", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" },
					{ name: "钟馗", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" },
					{ name: "不知火舞", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" },
					{ name: "张良", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" },
					{ name: "王昭君", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" },
					{ name: "姜子牙", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" },
					{ name: "露娜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" },
					{ name: "安琪拉", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" },
					{ name: "貂蝉", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" },
					{ name: "武则天", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" },
					{ name: "甄姬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" },
					{ name: "周瑜", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" },
					{ name: "芈月", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" },
					{ name: "扁鹊", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" },
					{ name: "孙膑", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" },
					{ name: "高渐离", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" },
					{ name: "嬴政", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" },
					{ name: "妲己", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" },
					{ name: "墨子", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" },
					{ name: "小乔", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" },
				],
			},
			{
				heroCategory: "射手",
				heroes: [
					{ name: "艾琳", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg" },
					{ name: "蒙犽", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" },
					{ name: "伽罗", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" },
					{ name: "公孙离", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" },
					{ name: "百里守约", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" },
					{ name: "黄忠", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" },
					{ name: "成吉思汗", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" },
					{ name: "虞姬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" },
					{ name: "李元芳", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" },
					{ name: "后羿", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" },
					{ name: "狄仁杰", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" },
					{ name: "马可波罗", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" },
					{ name: "鲁班七号", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" },
					{ name: "孙尚香", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" },
				],
			},
			{
				heroCategory: "辅助",
				heroes: [
					{ name: "金蝉", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg" },
					{ name: "阿古朵", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg" },
					{ name: "鲁班大师", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" },
					{ name: "瑶", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" },
					{ name: "盾山", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" },
					{ name: "明世隐", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" },
					{ name: "鬼谷子", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" },
					{ name: "东皇太一", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" },
					{ name: "大乔", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" },
					{ name: "太乙真人", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" },
					{ name: "蔡文姬", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" },
					{ name: "钟馗", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" },
					{ name: "张飞", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" },
					{ name: "牛魔", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" },
					{ name: "孙膑", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" },
					{ name: "刘禅", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" },
					{ name: "庄周", portrait: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" },
				],
			},
		];
		await Hero.deleteMany({});
		for (let cat of rawData) {
			// 找到与数据库中相对应的英雄分类
			const category = await Category.findOne({ name: cat.heroCategory });
			cat.heroes.map((hero) => {
				hero.categories = [category];
				return hero;
			});
			await Hero.insertMany(cat.heroes);
		}
		res.send(await Hero.find());
	});

	// 英雄列表接口
	router.get("/heroes/list", async (req, res) => {
		const parent = await Category.findOne({
			name: "英雄分类",
		});
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			{
				$lookup: {
					from: "heroes", // 对应Hero模型中的第三个参数
					localField: "_id",
					foreignField: "categories",
					as: "heroList",
				},
			},
			// {
			// 	$addFields: {
			// 		newsList: { $slice: ["$heroList", 5] },
			// 	},
			// },
		]);
		const subCats = cats.map((v) => v._id);
		cats.unshift({
			name: "热门",
			heroList: await Hero.find()
				.where({
					categories: { $in: subCats },
				})
				.limit(10)
				.lean(),
		});
		cats.map((cat) => {
			cat.heroList.map((hero) => {
				hero.categoryName = cat.name === "热门" ? hero.categories[0].name : cat.name;
				return hero;
			});
			return cat;
		});
		res.send(cats);
	});

	// 文章详情
	router.get("/articles/:id", async (req, res) => {
		const data = await Article.findById(req.params.id);
		res.send(data);
	});

	// 英雄详情
	router.get("/heroes/:id", async (req, res) => {
		const data = await Hero.findById(req.params.id).populate('categories').lean();
		res.send(data);
	});

	app.use("/web/api", router);
};
