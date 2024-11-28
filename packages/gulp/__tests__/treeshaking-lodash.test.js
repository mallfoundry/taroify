import { treeShakingLodash } from "../treeshaking-lodash"

describe("treeShakingLodash", () => {
  it("treeShakingLodash", () => {
    expect(treeShakingLodash(`
import { debounce, throttle, get as mGet } from "lodash";
import * as _ from "lodash";
import util from "lodash";
console.log(mGet(), util.set(), _.map())`)).toEqual(`
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import mGet from "lodash/get";
import _map from "lodash/map";
import utilset from "lodash/set";
console.log(mGet(), utilset(), _map())`)
  })
})
