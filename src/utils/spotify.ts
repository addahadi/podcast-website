export const APIController = function() {
    
    const clientId = '0a5a8c10f97b49df9a8d06e96870c694';
    const clientSecret = '85b1f6bdff274c70a3c7ffa9ee1e4dd8';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    const _getEpisode = async (token: string , id:string)=>{
        const result  = await fetch(`https://api.spotify.com/v1/shows/${id}/episodes?limit=5`, {
            method:'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        const data = result.json()
        return data
    }
    const _getGenres = async (token:string) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token:string, genreId:string) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log(data)
        return data;
    }

    const _getTracks = async (token:string, tracksEndPoint:string) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        
        return data.categories.items.filter((category:any) => category.name.toLowerCase().includes('podcast'));
    }
    const _getSearch = async ({search,token,type , limit} : {search : string , token : string , type : string , limit : number}) =>{
        const result = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=${type}&market=DZ&limit=${limit}`,{
            method : 'GET',
            headers:{ 'Authorization' : 'Bearer ' + token}
        })
        const data = await result.json()
        return data
    }
    const _getTrack = async (token:string, trackEndPoint:string) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        
        getToken() {
            return _getToken();
        },
        getGenres(token:string) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token:string, genreId:string) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token:string, tracksEndPoint:string) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token:string, trackEndPoint:string) {
            return _getTrack(token, trackEndPoint);
        },
        getSearch(search:string,token:string,type:string,limit:number){
            return _getSearch({search,token,type,limit})    
        },

        getEpisode(token:string , id :string){
            return _getEpisode(token,id)
        }
        
    }
};
