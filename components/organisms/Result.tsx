'use client';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';

// Helpers
import { downloadJson } from '@/helpers/downloadJson';

// Lib
import { getAllAnswers } from '@/lib/client/answerStorage';
import { getIdentity } from '@/lib/client/identityStorage';

function Result() {
  const onDownload = () => {
    downloadJson({
      identity: getIdentity(),
      answers: getAllAnswers(),
    }, 'answers.json');
  };

  return (
    <div>
      <p className="mb-4 font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
        Click here to download your answers:
      </p>
      <p>
        <Button
          type="submit"
          variant={VARIANTS.default}
          onClick={onDownload}
        >
          Download
        </Button>
      </p>
    </div>
  );
}

export default Result;
