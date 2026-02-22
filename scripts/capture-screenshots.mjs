import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projects = [
  { filename: 'task-app',          url: 'https://lsj-teact-task-app.netlify.app' },
  { filename: 'youtube-clone',     url: 'https://lsjyoutube.netlify.app' },
  { filename: 'gymlab',            url: 'https://stalwart-hotteok-6ac48e.netlify.app' },
  { filename: 'cannafe',           url: 'https://flourishing-bunny-a8480c.netlify.app' },
  { filename: 'barbershop',        url: 'https://dancing-crumble-880745.netlify.app' },
  { filename: 'prosecutor',        url: 'https://timely-gecko-f52c05.netlify.app' },
  { filename: 'innomerce',         url: 'https://starlit-begonia-2e077b.netlify.app' },
  { filename: 'coffeebean',        url: 'https://inspiring-peony-4e8bb0.netlify.app' },
  { filename: 'regularbold',       url: 'https://neon-biscochitos-ef5092.netlify.app' },
  { filename: 'museum-of-sweet',   url: 'https://whimsical-crepe-19f86c.netlify.app' },
  { filename: 'document-editor',   url: 'https://courageous-yeot-58578e.netlify.app' },
  { filename: 'react-app',         url: 'https://epic-liskov-7c76bc.netlify.app' },
  { filename: 'vue-movie',         url: 'https://dreamy-wright-e04f25.netlify.app' },
  { filename: 'starbucks',         url: 'https://festive-hoover-658469.netlify.app' },
  { filename: 'corelle',           url: 'https://classy-pavlova-d8647d.netlify.app' },
];

const outputDir = path.join(__dirname, '../public/images/projects');

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const results = [];

  for (const project of projects) {
    let page;
    try {
      process.stdout.write(`📸 캡처 중: ${project.filename}... `);
      page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });

      await page.goto(project.url, {
        waitUntil: 'domcontentloaded',
        timeout: 25000,
      });

      // 페이지 로드 및 애니메이션 대기
      await page.waitForTimeout(2500);

      const filepath = path.join(outputDir, `${project.filename}.jpg`);
      await page.screenshot({
        path: filepath,
        type: 'jpeg',
        quality: 90,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });

      console.log('✅ 완료');
      results.push({ filename: project.filename, status: 'success' });
    } catch (err) {
      console.log(`❌ 실패 (${err.message.slice(0, 60)})`);
      results.push({ filename: project.filename, status: 'failed', error: err.message });
    } finally {
      if (page) await page.close();
    }
  }

  await browser.close();

  console.log('\n─────────────────────────────');
  console.log(`✅ 성공: ${results.filter(r => r.status === 'success').length}개`);
  console.log(`❌ 실패: ${results.filter(r => r.status === 'failed').length}개`);
  const failed = results.filter(r => r.status === 'failed');
  if (failed.length > 0) {
    console.log('\n실패 목록:');
    failed.forEach(r => console.log(`  - ${r.filename}`));
  }
}

main().catch(console.error);
