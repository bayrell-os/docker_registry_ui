"use strict";


if (typeof App == 'undefined') var App = {};

App.Lib = {
	
	
	
	/**
	 * Deep clone object
	 * https://stackoverflow.com/questions/122102/
	 */
	deepClone: function(oldObject){
		var newObject = jQuery.extend(true, {}, oldObject);
		return newObject;
	},
	
	
	
	/**
	 * Returns repo list
	 */
	getRepositories: function(callback){
		$.ajax({
			url: "/v2/_catalog",
			dataType: 'json',
			method: 'get',
			cache: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			processData: true,
			success: (function(callback){
				return function(data, textStatus, jqXHR){
					var res = [];
					if (data.repositories != null){
						for (var i=0; i<data.repositories.length; i++){
							res.push({
								name: data.repositories[i],
							});
						}
					}
					callback(null, res);
				}
			})(callback),
			error: (function(callback){
				return function(jqXHR, textStatus, errorThrown){
					callback(new Error(errorThrown), null);
				}
			})(callback),
		});
	},
	
	
	
	/**
	 * Returns repo tags
	 */
	getRepositoryTags: function(repo_name, callback){
		$.ajax({
			url: "/v2/" + repo_name + "/tags/list",
			dataType: 'json',
			method: 'get',
			cache: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			processData: true,
			success: (function(callback){
				return function(data, textStatus, jqXHR){
					var res = [];
					if (data.tags != null){
						for (var i=0; i<data.tags.length; i++){
							res.push({
								name: data.tags[i],
							});
						}
					}
					callback(null, res);
				}
			})(callback),
			error: (function(callback){
				return function(jqXHR, textStatus, errorThrown){
					callback(new Error(errorThrown), null);
				}
			})(callback),
		});
	},
	
	
	
	/**
	 * Remove repository digest
	 */
	removeRepositoryDigest: function(repo_name, digest, callback){
		$.ajax({
			url: "/v2/" + repo_name + "/manifests/" + digest,
			dataType: 'json',
			method: 'delete',
			cache: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			processData: true,
			headers: {
				Accept: "application/vnd.docker.distribution.manifest.v2+json",
			},
			success: (function(callback){
				return function(data, textStatus, jqXHR){
					var digest = jqXHR.getResponseHeader("Docker-Content-Digest");					
					callback(null);
				}
			})(callback),
			error: (function(callback){
				return function(jqXHR, textStatus, errorThrown){
					callback(new Error(errorThrown));
				}
			})(callback),
		});
	},
	
	
	
	/**
	 * Remove repository tag
	 */
	removeRepositoryTag: function(repo_name, tag_name, callback){
		
		$.ajax({
			url: "/v2/" + repo_name + "/manifests/" + tag_name,
			dataType: 'json',
			method: 'get',
			cache: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			processData: true,
			headers: {
				Accept: "application/vnd.docker.distribution.manifest.v2+json",
			},
			success: (function(repo_name, callback){
				return function(data, textStatus, jqXHR){
					var digest = jqXHR.getResponseHeader("Docker-Content-Digest");					
					App.Lib.removeRepositoryDigest(repo_name, digest, callback);
				}
			})(repo_name, callback),
			error: (function(callback){
				return function(jqXHR, textStatus, errorThrown){
					callback(new Error(errorThrown));
				}
			})(callback),
		});
		
	},
	
	
};