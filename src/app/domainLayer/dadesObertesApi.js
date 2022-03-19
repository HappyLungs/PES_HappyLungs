const axios =  require('axios');

export function getData(codiEoi, data) {
    axios({
    method: 'get',
    url: 'https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json?codi_eoi='+codiEoi+'&data='+data,
    data: {
        "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) {
        console.log(res.data);
        return res.data;
    });
}
