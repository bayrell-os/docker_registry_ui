"use strict";


if (typeof App == 'undefined') var App = {};

App.Main = Vue.extend({
	
	data: function () {
		
		return {
			/**
			 * Available lists:
			 * - repo_list
			 * - repo_tags_list
			 */ 
			current_page: 'repo_list',
			current_repo_name: '',
			repos: [],
			tags: [],
		};
	},
	
	methods: {
		
		
		/**
		 * Load repo list
		 */
		loadRepositories: function(){
			App.Lib.getRepositories(function(err, data){
				if (err) throw err;
				app.repos = data;
			});
		},
		
		
		
		/**
		 * Load repo tags
		 */
		loadRepositoryTags: function(repo_name, callback){
			App.Lib.getRepositoryTags(repo_name, (function(callback){
				return function(err, data){
					if (err) throw err;
					callback(repo_name, data);
				}
			})(callback));
		},
		
		
		
		/**
		 * Open repo list
		 */
		openRepoList: function(){
			this.current_page = 'repo_list';
		},
		
		
		
		/**
		 * Open Repository
		 */
		openRepoTags: function(repo_name){
			this.tags = [];
			this.current_repo_name = repo_name;
			
			this.loadRepositoryTags(repo_name, function(repo_name, data){
				app.tags = data;
				app.current_page = 'repo_tags_list';
			});
		},
		
		
		
		/**
		 * Show dialod remove tag
		 */
		openRemoveTag: function(repo_name, tag_name){
			BootstrapDialog.show({
				title: 'Delete tag ' + repo_name+ ':' + tag_name,
				message: $(
					'<div>Do you realy want to delete <b>' + repo_name+ ':' + tag_name + '</b> ?</div>' +
					'<div class="form-result"></div>',
				),
				onshow: function(dialog) {
					//dialog.getButton('button-c').disable();
				},
				buttons: [
					{
						label: 'Delete record',
						cssClass: 'btn-danger',
						action: (function(repo_name, tag_name){
							return function(dialog) {
								App.Lib.removeRepositoryTag(repo_name, tag_name, (function(err){
									if (err) throw err;
									
									/* Load new tag list */
									app.loadRepositoryTags(repo_name, function(repo_name, data){
										app.tags = data;
										app.current_page = 'repo_tags_list';
									});
								}));
								dialog.close();
							}
						})(repo_name, tag_name)
					},
					{
						label: 'Close',
						cssClass: 'btn-default',
						action: function(dialog) {
							dialog.close();
						}
					}
				]
			});
		},
		
	},
	
});