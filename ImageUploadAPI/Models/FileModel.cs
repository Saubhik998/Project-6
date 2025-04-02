using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ImageUploadAPI.Models;

public class FileModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("FileName")]
    public string FileName { get; set; } = string.Empty;

    [BsonElement("Description")]
    public string Description { get; set; } = string.Empty;
}
