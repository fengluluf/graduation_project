import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 查询
     * @param data
     */
    searchDrug: function (data) {
        if(develop) {
            
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/drug/searchDrug',
                data:data,
                type: 'POST',
                success: function (d) {
                    def.resolve(d)
                },
                error: function (d) {
                    def.resolve(d)
                }
            })
            return def;
        }
    },

}