using System.Text.Json.Serialization;

public class Tarefa
{
    [JsonPropertyName("lookupId")]
    public string LookupId { get; set; } = string.Empty;

    [JsonPropertyName("titulo")]
    public string Titulo { get; set; } = string.Empty;

    [JsonPropertyName("descricao")]
    public string Descricao { get; set; } = string.Empty;

    [JsonPropertyName("concluidoEm")]
    public DateTime? ConcluidoEm { get; set; }
}