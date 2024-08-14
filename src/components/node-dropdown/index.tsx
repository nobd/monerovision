import * as React from 'react';
import './node-dropdown.scss';
import { OutsideAlerter } from 'components/outside-click';
import { Select } from './components/select-node';
import { connect } from 'react-redux';
import { openModal, OpenModalType } from 'redux/modals/actions';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { LogoBitcoin } from '../../app/nav/logo-bitcoin';
import { LogoMempool } from '../../app/nav/logo-mempool';
import { LogoEth } from '../../app/nav/logo-eth';

interface DispatchProps {
  openModal: OpenModalType;
}

type Props = DispatchProps;

interface State {
  isDropdownOpen: boolean;
}

class NodeDropdownClass extends React.Component<Props, State> {
  public state = {
    isDropdownOpen: false
  };
  public openButton: any;
  constructor(props: any) {
    super(props);
    // React v16.3 createRef() API, until @types/react have updated cast as 'any'
    this.openButton = (React as any).createRef();
  }

  public toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  public render() {
    const {
      state: { isDropdownOpen },
      toggleDropdown,
      openButton
    } = this;

    return (
      <div className="Select-node">
        <div className="Select-node--logo-wrapper">
          <a className="Select-node--logo-link" href="https://btcmempool.org/">
            <LogoMempool />
          </a>
          <a className="Select-node--logo-link" href="https://btcscan.org/">
            <LogoBitcoin />
          </a>
          <a className="Select-node--logo-link" href="https://ethscan.org/">
            <LogoEth />
          </a>
        </div>
        <button className="Select-node-button" onClick={toggleDropdown} ref={this.openButton}>
          Nodes <i className="nc-icon nc-small-triangle-down size_16px" />
        </button>
        <TransitionGroup>
          {isDropdownOpen && (
            <CSSTransition classNames="Select-node-dropdown-animation" timeout={200}>
              <OutsideAlerter onClick={toggleDropdown} exception={openButton.current}>
                <div className="Select-node-dropdown">
                  <Select onSelect={toggleDropdown} />
                </div>
              </OutsideAlerter>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export const NodeDropdown = connect(
  null,
  { openModal }
)(NodeDropdownClass);
