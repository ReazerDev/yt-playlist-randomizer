export class PlaylistItem {
    public title: string;
    public videoId: string;
    public channelTitle: string;
    public videoLength: string;
    public thumbnailUrl: string;

    public static new(json) {
        let model = new PlaylistItem();
        model.title = json['snippet']['title'];
        model.videoId = json['snippet']['resourceId']['videoId'];
        model.channelTitle = 'Unavailable';
        model.videoLength = "0:00";
        model.thumbnailUrl = json['snippet']['thumbnails']['default']['url'];
        
        return model;
    }

    public static collection(json): PlaylistItem[] {
        let collection = [];
        for(let item of json) {
            collection.push(PlaylistItem.new(item));
        }

        return collection
    }
}