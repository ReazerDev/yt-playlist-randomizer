export class Playlist {
    public title: string;
    public description: string;
    public thumbnailUrl: string;
    public itemCount: number;

    public static new(json) {
        let model = new Playlist();

        model.title = json['snippet']['title'];
        model.description = json['snippet']['description'] == "" ? "No description" : json['snippet']['description'];
        model.thumbnailUrl = json['snippet']['thumbnails']['high']['url'];
        model.itemCount = json['contentDetails']['itemCount'];
        
        return model;
    }
}