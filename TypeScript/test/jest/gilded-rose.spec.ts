import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('does not allow negative quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

    const items = gildedRose.updateQuality();

    const fooItem = items[0];

    expect(fooItem.name).toBe('foo');
    expect(fooItem.sellIn).toBe(-1);
    expect(fooItem.quality).toBe(0);
  });

  it('standard item degrades by 1 before sell date', () => {
    const gildedRose = new GildedRose([new Item('foo', 3, 3)]);

    const items = gildedRose.updateQuality();

    const fooItem = items[0];

    expect(fooItem.quality).toBe(2);
  });

  it('standard item degrades by 2 after sell date', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 6)]);

    const items = gildedRose.updateQuality();

    const fooItem = items[0];

    expect(fooItem.quality).toBe(4);
  });

  it('Aged Brie quality increases with time', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie',1,48)]);

    const items = gildedRose.updateQuality();

    const agedBrie = items[0];

    expect(agedBrie.quality).toBe(49);
  })

  it('Aged Brie quality increases by two after sell by date', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie',0,0)]);

    const items = gildedRose.updateQuality();

    const agedBrie = items[0];

    expect(agedBrie.quality).toBe(2);
  })

  it('Aged Brie quality cannot go beyond 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie',0,50)]);

    const items = gildedRose.updateQuality();

    const agedBrie = items[0];

    expect(agedBrie.quality).toBe(50);
  })
  //legendary item "Sulfuras" has quality of 80 that is never impacted

  it('Sulfuras quality is always 80 and sell by date is unaffected', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros',0,80)]);

    const items = gildedRose.updateQuality();

    const sulfuras = items[0];

    expect(sulfuras.quality).toBe(80);
    expect(sulfuras.sellIn).toBe(0);
  })

  it('Backstage passes increases quality by 1 when more than 10 days away', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',11,0)]);

    const items = gildedRose.updateQuality();

    const backstagePass = items[0];

    expect(backstagePass.quality).toBe(1);
  })

  it('Backstage pass quality cannot exceed 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',11,50)]);

    const items = gildedRose.updateQuality();

    const backstagePass = items[0];

    expect(backstagePass.quality).toBe(50);
  })

  it('Backstage passes increases quality by 2 when [10,5) days away', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',10,0)]);

    const items = gildedRose.updateQuality();
    const backstagePass = items[0];

    expect(backstagePass.quality).toBe(2);
    
    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(4);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(6);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(8);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(10);
  })

  it('Backstage passes increases quality by 3 when [5,0) days away', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',5,0)]);

    const items = gildedRose.updateQuality();
    const backstagePass = items[0];

    expect(backstagePass.quality).toBe(3);
    
    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(6);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(9);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(12);

    gildedRose.updateQuality()
    expect(backstagePass.quality).toBe(15);
  })

  it('Backstage passes quality drops to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert',0,42)]);

    const items = gildedRose.updateQuality();

    const backstagePass = items[0];

    expect(backstagePass.quality).toBe(0);
  })

  it('Conjured items quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured foo',1,12)]);

    const items = gildedRose.updateQuality();

    const conjuredItem = items[0];

    expect(conjuredItem.quality).toBe(10);

    gildedRose.updateQuality();
    expect(conjuredItem.quality).toBe(6);

  })

  it('Conjured items quality cannot fall below 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured foo',1,1)]);

    const items = gildedRose.updateQuality();

    const conjuredItem = items[0];

    expect(conjuredItem.quality).toBe(0);

    gildedRose.updateQuality();
    expect(conjuredItem.quality).toBe(0);

  })
});
