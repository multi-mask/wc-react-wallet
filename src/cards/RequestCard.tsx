import * as React from "react";
import styled from "styled-components";
import { AppMetadata, SessionTypes } from "@walletconnect/types";

import Column from "../components/Column";
import Button from "../components/Button";
import Blockchain from "../components/Blockchain";

import { getChainRequestRender } from "../chains";
import Peer from "../components/Peer";
import { ChainNamespaces } from "../helpers";

const SValue = styled.div`
  font-family: monospace;
  width: 100%;
  font-size: 12px;
  background-color: #eee;
  padding: 8px;
  word-break: break-word;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SActions = styled.div`
  margin: 0;
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
  & > * {
    margin: 0 5px;
  }
`;

interface RequestCardProps {
  chainData: ChainNamespaces;
  chainId: string;
  requestEvent: SessionTypes.RequestEvent;
  metadata: AppMetadata;
  approveRequest: (requestEvent: SessionTypes.RequestEvent) => void;
  rejectRequest: (requestEvent: SessionTypes.RequestEvent) => void;
}

const RequestCard = (props: RequestCardProps) => {
  const { chainData, chainId, requestEvent, metadata, approveRequest, rejectRequest } = props;
  const params = getChainRequestRender(requestEvent.request, chainId);
  console.log("RENDER", "method", requestEvent.request.method);
  console.log("RENDER", "params", requestEvent.request.params);
  console.log("RENDER", "formatted", params);

  return (
    <Column>
      <h6>{"App"}</h6>
      <Peer oneLiner metadata={metadata} />
      <h6>{"Chain"}</h6>
      <Blockchain key={`request:chain:${chainId}`} chainData={chainData} chainId={chainId} />
      {params.map(param => (
        <React.Fragment key={param.label}>
          <h6>{param.label}</h6>
          <SValue>{param.value}</SValue>
        </React.Fragment>
      ))}
      <SActions>
        <Button onClick={() => approveRequest(requestEvent)}>{`Approve`}</Button>
        <Button onClick={() => rejectRequest(requestEvent)}>{`Reject`}</Button>
      </SActions>
    </Column>
  );
};

export default RequestCard;
