namespace ImageUploadAPI.Models;

public class MongoDBSettings
{
    public string ConnectionURI { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string GridFSBucket { get; set; } = string.Empty;
}
