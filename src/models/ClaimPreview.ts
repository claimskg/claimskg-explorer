export class ClaimPreview {
  id: string;
  text: string;
  date: string;
  truthRating: number;
  ratingName: string;
  author: string;
  link: string;

  constructor(jsonData) {
    this.id = jsonData.id.value;
    this.author = jsonData.author.value;
    this.date = jsonData.date.value;
    this.link = jsonData.link.value;
    this.truthRating = parseInt(jsonData.truthRating.value, 10);
    this.ratingName = jsonData.ratingName.value;
    this.text = jsonData.text.value;
  }

  public static convertJSONtoClaimsPreview(response: any): ClaimPreview[] {
    const results = response.results.bindings;
    const claims = [];
    for (const result of results) {
      const newClaim = new ClaimPreview(result);
      claims.push(newClaim);
    }
    return claims;
  }
}
