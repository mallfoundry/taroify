import { treeShakingLodash } from "../treeshaking-lodash"

describe("treeShakingLodash", () => {
  it("treeShakingLodash", () => {
    expect(treeShakingLodash(`
import { debounce, throttle, get as mGet } from "lodash";
import * as _ from "lodash";
import util from "lodash";
const maxOrMin = true ? _.max : _.min
console.log(mGet(), util.set(), _.map(), maxOrMin())`)).toEqual(`
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import mGet from "lodash/get";
import _max from "lodash/max";
import _min from "lodash/min";
import _map from "lodash/map";
import utilset from "lodash/set";
const maxOrMin = true ? _max : _min
console.log(mGet(), utilset(), _map(), maxOrMin())`)
  })
})
