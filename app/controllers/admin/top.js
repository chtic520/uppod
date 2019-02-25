var SocialAccount = require('../../models/social-account');
var _ = require('underscore');

//Top Index
exports.index = function(req, res) {
    SocialAccount
        .find({})
        .sort('meta.createAt')
        .exec(function(err, social) {
            if (err) {
                console.log(err);
            };

            res.render('admin/topList', {
                title: '头部管理',
                social: social,
                lala: "facebook"
            });
        })
};

//Social New
exports.socialNew = function(req, res) {
    res.render('admin/socialForm', {
        title: '新增推广途径',
        social: {}
    })
};

//Social Save
exports.socialSave = function(req, res){
	var id = req.body.social._id;
	var socialObj = req.body.social;
	var _social;

	if(id){
		SocialAccount.findById(id, function(err, social){
			if(err){
				console.log(err);
			};

			_social = _.extend(social, socialObj);
			_social.save(function(err, social){
				if(err){
					console.log(err);
				};

				res.redirect('/admin/top/view');
			})
		})
	}else{
		_social = new SocialAccount(socialObj);

		_social.save(function(err, social){
			if(err){
				console.log(err);
			};

			res.redirect('/admin/top/view');
		})
	}
}

//Social Update
exports.socialUpdate = function(req, res){
	var id = req.params.id;

	if(id){
		SocialAccount
		.findOne({_id: id})
		.exec(function(err, social){
			res.render('admin/socialForm', {
				title: '更新' + social.name + '信息',
				social: social
			})
		})
	}
}

//Social Delete
exports.socialDel = function(req, res){
	var delList = (req.body.delList).split(',');

    if (delList.length > 0) {
        SocialAccount.remove({ _id: { $in: delList } }, function(err, social) {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: 1 });
            }
        });
    }
}