import React from 'react';

const ModalHeader = (params: { title: string }) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">{params.title}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
};

const ModalBody = (params: { component: JSX.Element }) => {
  return (
    <>
      <div className="modal-body">{params.component}</div>
    </>
  );
};

const ModalFooter = (params: { component: JSX.Element }) => {
  return (
    <>
      <div className="modal-footer">{params.component}</div>
    </>
  );
};

export const BasciModal = (params: {
  id: string;
  title: string;
  bodyComponent: JSX.Element;
  footerComponent: JSX.Element;
}) => {
  return (
    <>
      <div className="modal fade" id={params.id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader title={params.title} />
            <ModalBody component={params.bodyComponent} />
            <ModalFooter component={params.footerComponent} />
          </div>
        </div>
      </div>
    </>
  );
};
