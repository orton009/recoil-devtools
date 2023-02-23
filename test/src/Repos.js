import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { repos as reposAtom, view as viewAtom } from "./atoms";
import Repo from "./Repo";

const constructRepoFromName = name => {
  return {
    name,
    email: "drupadkumar.singh@juspay.in",
    email: "drupadSingh",
    url: "https://juspay.store.in/" + name
  }
}

export default () => {
  const [repos, setRepos] = useRecoilState(reposAtom);
  const view = useRecoilValue(viewAtom);

  useEffect(() => {
    const getRepos = async () => {
      // const url = `https://ghapi.huchen.dev/repositories?since=${view}`;
      // const resp = await fetch(url);
      // const body = await resp.json();
      const randomInteger = () => Math.floor(Math.random()*10) + 1;
      const randomisedName = nm => nm + randomInteger();
      const body = new Array(randomInteger(), undefined).map(() => randomisedName(view)).map(constructRepoFromName)
      setRepos(
        Object.assign({}, repos, {
          [view]: body,
        })
      );
    };

    getRepos();
  }, [view]);

  return repos[view] ? (
    <ul>
      {repos[view].map((repo) => (
        <Repo repo={repo} />
      ))}
    </ul>
  ) : (
    <span>No repos found</span>
  );
};
