export class YoutubeVideo {
    public title: string;
    public videoId: string;
    public channelTitle: string;
    public videoLength: string;
    public thumbnailUrl: string;

    public static new(json, isSearch: boolean = false) {
        let model = new YoutubeVideo();
        model.title = json['snippet']['title'];
        model.videoId = isSearch ? json['id']['videoId'] : json['snippet']['resourceId']['videoId'];
        model.channelTitle = json['snippet']['channelTitle'] || 'Unavailable';
        model.videoLength = "0:00";
        model.thumbnailUrl = json['snippet']['thumbnails']['default']['url'];
        
        return model;
    }

    public static collection(json, isSearch: boolean = false): YoutubeVideo[] {
        let collection = [];
        for (let item of json) {
            if (isSearch && item['snippet']['liveBroadcastContent'] != 'none') {
                continue;
            }
            collection.push(YoutubeVideo.new(item, isSearch));
        }

        return collection
    }
}