import type { Tweak } from '@/api/types';
import { type FC } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { fetch } from '../utils/fetch';
import { useLoaderData } from '@rain-cafe/react-utils/react-router';
import { AppImage } from '../components/AppImage';
import { Label } from '../components/Label';
import { Pill } from '../components/Pill';
import { Card } from '../components/Card';
import { Code } from '../components/Code';

const ALIASES: Record<string, string> = {
  esync: 'PROTON_NO_ESYNC',
  fsync: 'PROTON_NO_FSYNC',
};

export async function loader({ params }: LoaderFunctionArgs) {
  return await fetch<Tweak>(`/api/${params.id}.json`);
}

export const Component: FC = () => {
  const tweak = useLoaderData<typeof loader>();
  const environmentVariables = Object.entries(tweak.tweaks.env);
  const settings = Object.entries(tweak.tweaks.settings);

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <AppImage id={tweak.id} />
        <div className="text-md">
          {tweak.name} ({tweak.id})
        </div>
      </div>
      <Card>
        <Label label="Protontricks Command" />
        <Code shell>
          protontricks {tweak.id} {tweak.tweaks.tricks.join(' ')}
        </Code>
        <Label label="Launch Options" />
        <Code>
          {environmentVariables.map(([key, value]) => `${key}=${value} `).join()}
          {settings.map(([key, value]) => {
            const finalKey = ALIASES[key] ?? key;
            const finalValue = typeof value === 'boolean' ? (value ? '1' : '0') : value;

            return `${finalKey}=${finalValue}`;
          })}
          %command%
        </Code>
      </Card>
      <Card>
        <Label label="Tricks">
          {tweak.tweaks.tricks.map((trick, index) => (
            <Pill key={index}>{trick}</Pill>
          ))}
        </Label>
      </Card>
      <Card>
        <Label label="Environment Variables">
          {environmentVariables.length === 0
            ? 'None'
            : environmentVariables.map(([key, value]) => (
                <Pill key={key}>
                  {key} = {typeof value === 'boolean' ? value : `"${value}"`}
                </Pill>
              ))}
        </Label>
        <Label label="Settings">
          {settings.length === 0
            ? 'None'
            : settings.map(([key, value]) => (
                <Pill key={key}>
                  {key} = {typeof value === 'boolean' ? value : '"value"'}
                </Pill>
              ))}
        </Label>
      </Card>
      {/* <Card>
        <Label label="API Info">
          <Pill>Version = V2</Pill>
        </Label>
        <Label label="HTTP">
          <Pill>
            GET {location.origin}/api/{tweak.id}.json
          </Pill>
        </Label>
        <Label label="RESPONSE">
          <Pill>JSON</Pill>
        </Label>
        <Code>{JSON.stringify(tweak, null, 8)}</Code>
      </Card> */}
    </>
  );
};
