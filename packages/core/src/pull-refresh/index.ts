import PullRefreshElement, { PullRefreshProps } from "./pull-refresh"
import {
  PullRefreshCompleted,
  PullRefreshLoading,
  PullRefreshLoosing,
  PullRefreshPulling,
} from "./pull-refresh-children"

interface PullRefreshInterface {
  (props: PullRefreshProps): JSX.Element

  Pulling: typeof PullRefreshPulling
  Loosing: typeof PullRefreshLoosing
  Loading: typeof PullRefreshLoading
  Completed: typeof PullRefreshCompleted
}

const PullRefresh = PullRefreshElement as PullRefreshInterface

PullRefresh.Pulling = PullRefreshPulling
PullRefresh.Loosing = PullRefreshLoosing
PullRefresh.Loading = PullRefreshLoading
PullRefresh.Completed = PullRefreshCompleted

export default PullRefresh
