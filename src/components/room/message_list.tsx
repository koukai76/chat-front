import React from 'react';
import moment from 'moment';

import { T_Talks } from 'src/interface/talks';
import { Constant } from 'src/constant';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const reactStringReplace = require('react-string-replace');

const System = (params: {
  num: number;
  message: string;
  createdAt: number;
}) => {
  return (
    <div key={params.num} style={{ padding: '8px 16px 8px 16px' }}>
      <Divider light />
      <ListItemText
        primary={
          <Typography
            style={{
              color: 'rgba(0, 0, 0, 0.54)',
              fontSize: 13,
            }}
          >
            システム
          </Typography>
        }
        style={{ whiteSpace: 'pre-wrap' }}
        secondary={
          <Typography style={{ color: 'black', fontSize: 16 }}>
            <span>{params.message}</span>
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: 13,
              }}
            >
              {`${moment(new Date(params.createdAt)).format(
                'YYYY-MM-DD HH:mm:ss'
              )}`}
            </span>
          </Typography>
        }
      />
    </div>
  );
};

export const MessageList = (params: { talk: T_Talks['key']['key'][] }) => {
  return React.useMemo(() => {
    return (
      <>
        {params.talk.map((m, i) => {
          // システムメッセージ
          if (m.kind === 2) {
            return (
              <System num={i} message={m.message} createdAt={m.createdAt} />
            );
          }

          return (
            <div key={i}>
              <Divider light />
              <ListItem>
                {/* アイコン */}
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={`/img/icon_${Constant.icons[m.icon]}.png`}
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                {/* アイコン */}

                <ListItemText
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                  }}
                  primary={
                    // 名前
                    <Typography
                      style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        fontSize: 13,
                      }}
                    >
                      {m.uname}
                    </Typography>
                    // 名前ここまで
                  }
                  secondary={
                    <Typography
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}
                    >
                      {/* メッセージ */}
                      {reactStringReplace(
                        m.message,
                        /(https?:\/\/\S+)/g,
                        (match: string, j: number) => (
                          <span key={match + j}>
                            <a
                              href={match}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {match}
                            </a>
                          </span>
                        )
                      )}
                      {/* メッセージここまで */}

                      {/* 日付 */}
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          color: 'rgba(0, 0, 0, 0.54)',
                          fontSize: 13,
                        }}
                      >
                        {`${moment(new Date(m.createdAt)).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}`}
                      </span>
                      {/* 日付ここまで */}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider light />
            </div>
          );
        })}
      </>
    );
  }, [JSON.stringify(params)]);
};
