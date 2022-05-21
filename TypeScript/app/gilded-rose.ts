export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if(this.isConjured(item)) {
        this.changeQuality(item);
      }
      this.changeQuality(item);
      this.changeSellIn(item);
    });

    return this.items;
  }

  private isConjured(item:Item) {
    return item.name.startsWith('Conjured');
  }

  private changeQuality(item:Item) {
    if(this.isBackstagePass(item)) {
      this.updateBackstagePassQuality(item);
    }
    else if(this.isBrie(item)) {
      this.updateBrieQuality(item);
    }
    else if(!this.isSulfuras(item)) {
      this.updateNormalQuality(item);
    }

    this.setQualityBound(item);
  }

  private changeSellIn(item:Item) {
    if(!this.isSulfuras(item)) {
      item.sellIn--;
    }
  }

  private updateBackstagePassQuality(item:Item) {
    if(item.sellIn > 10) {
      item.quality++;
    }
    else if(item.sellIn > 5) {
      item.quality += 2;
    }
    else if(item.sellIn > 0) {
      item.quality += 3;
    }
    else {
      item.quality = 0;
    }
  }

  private updateBrieQuality(item:Item) {
    if(item.sellIn > 0) {
      item.quality++;
    }
    else {
      item.quality += 2;
    }
  }

  private updateNormalQuality(item:Item) {
    if(item.sellIn > 0) {
      item.quality--;
    }
    else {
      item.quality -= 2;
    }
  }

  private setQualityBound(item:Item) {
    if(item.quality > 50) {
      item.quality = 50;
    }
    else if(item.quality < 0) {
      item.quality = 0;
    }
    if(this.isSulfuras(item)) {
      item.quality = 80;
    }
  }

  private isItem(item:Item, name:String) {
    return item.name == name;
  }

  private isBrie(item:Item) {
    return this.isItem(item, 'Aged Brie');
  }

  private isBackstagePass(item:Item) {
    return this.isItem(item, 'Backstage passes to a TAFKAL80ETC concert');
  }

  private isSulfuras(item:Item) {
    return this.isItem(item, 'Sulfuras, Hand of Ragnaros');
  }
}
