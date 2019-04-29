import {RatingEnum} from './RatingEnum';

export class ResultCount {
  false = 0;
  true = 0;
  mixture = 0;
  other = 0;

  constructor(jsonData) {
    for (const count of jsonData) {
      if (count.rating.value === RatingEnum.True) {
        this.true = parseInt(count.count.value, null);
      }
      if (count.rating.value === RatingEnum.False) {
        this.false = parseInt(count.count.value, null);
      }
      if (count.rating.value === RatingEnum.Mixture) {
        this.mixture = parseInt(count.count.value, null);
      }
      if (count.rating.value === RatingEnum.Other) {
        this.other = parseInt(count.count.value, null);
      }
    }
  }

  getTotal(): number {
    return this.false + this.true + this.mixture + this.other;
  }

  getDetails(): string {
    let details = '(';
    if (this.true > 0) {
      details += this.true + ' True, ';
    }
    if (this.false > 0) {
      details += this.false + ' False, ';
    }
    if (this.mixture > 0) {
      details += this.mixture + ' Mixture, ';
    }
    if (this.other > 0) {
      details += this.other + ' Other';
    } else {
      details = details.substring(0, details.lastIndexOf(','));
    }
    details += ')';

    return details;
  }
}
