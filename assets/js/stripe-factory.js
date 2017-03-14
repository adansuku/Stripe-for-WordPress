/*
 * Stripe Factory
 */
wp_stripe.app.factory( 'Stripe', function( $resource, $q, $http ){
    return {
        get_settings: function( data ){
            var response = $q.defer();
            var config = {};
            if( data && data.more_settings ) {
                config.params = {
                    'more_settings[]': [],
                };
                angular.forEach( data.more_settings, function( key, value ) {
                    config.params['more_settings[]'].push( key );
                });
            }
            $http.get(stripe_wp_local.api_url + 'stripe-wp/settings?_wpnonce=' + stripe_wp_local.nonce, config ).then(function(res) {
                response.resolve( res );
            });
            return response.promise;
        },
        save_settings: function( data ){
            var response = $q.defer();
            $http.post(stripe_wp_local.api_url + 'stripe-wp/settings?_wpnonce=' + stripe_wp_local.nonce, data).then(function(res) {
                response.resolve( res );
            });
            return response.promise;
        },
        customer: {
            get_customers: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/customers?_wpnonce=' + stripe_wp_local.nonce;
                if( data && data.starting_after ){
                    url = url + '&starting_after=' + data.starting_after;
                }
                if( data && data.id ){
                    url = url + '&id=' + data.id;
                }
                var response = $q.defer();
                $http.get(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            save: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/customers?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                }
                var response = $q.defer();
                $http.post(url, data).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            get: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/customers/';
                if( data.id ) {
                    url = url + data.id + '?_wpnonce=' + stripe_wp_local.nonce;
                }
                var response = $q.defer();
                $http.get(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            delete: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/customers?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                } else {
                    return 'No Customer ID Set';
                }
                var response = $q.defer();
                $http.delete(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            new: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/customers?_wpnonce=' + stripe_wp_local.nonce;
                var response = $q.defer();
                $http.post(url, data).then(function(res) {
                    response.resolve( res );
                },function(res){
                    response.reject( res );
                });
                return response.promise;
            },
        },
        plans: {
            get_plan: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/plans?_wpnonce=' + stripe_wp_local.nonce;
                if( data && data.id ) {
                    url = url + data.id;
                }
                var response = $q.defer();
                $http.get(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            save_plan: function( data ) {
                var url = stripe_wp_local.api_url + 'stripe-wp/plans?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                } else {
                    return 'No ID set';
                }
                var response = $q.defer();
                $http.post(url, data).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            delete_plan: function( data ) {
                var url = stripe_wp_local.api_url + 'stripe-wp/plans?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                } else {
                    return 'No ID set';
                }
                var response = $q.defer();
                $http.delete(url, data).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            }
        },
        coupons: {
            get_coupons: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/coupons?_wpnonce=' + stripe_wp_local.nonce;
                if( data && data.starting_after ){
                    url = url + '&starting_after=' + data.starting_after;
                }
                if( data && data.id ){
                    url = url + '&id=' + data.id;
                }
                var response = $q.defer();
                $http.get(url).then(function(res) {
                    response.resolve( res );
                },function( res ) {
                    response.reject( res );
                });
                return response.promise;
            },
            save: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/coupons?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                }
                var response = $q.defer();
                $http.post(url, data).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            get: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/coupons?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                }
                var response = $q.defer();
                $http.get(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            delete: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/coupons?_wpnonce=' + stripe_wp_local.nonce;
                if( data.id ) {
                    url = url + data.id;
                } else {
                    return 'No Customer ID Set';
                }
                var response = $q.defer();
                $http.delete(url).then(function(res) {
                    response.resolve( res );
                });
                return response.promise;
            },
            new: function( data ){
                var url = stripe_wp_local.api_url + 'stripe-wp/coupons?_wpnonce=' + stripe_wp_local.nonce;
                var response = $q.defer();
                $http.post(url, data).then(function(res) {
                    response.resolve( res );
                },function(res){
                    response.reject( res );
                });
                return response.promise;
            },
        },
    };
});