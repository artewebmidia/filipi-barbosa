import {test,expect} from '@playwright/test';
test('layout, imagens e conteúdo principal',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/'); await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{level:1})).toContainText('Clareza para decidir.');
 await expect(page.locator('.area-card')).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded(); await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
 expect(errors).toEqual([]);
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`test-results/${info.project.name}.png`,fullPage:true});
});
test('detalhes da área e fechamento por teclado',async({page})=>{
 await page.goto('/'); await page.locator('.area-card').filter({hasText:'Direito Civil'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.getByRole('dialog').getByRole('link')).toHaveAttribute('href',/wa.me\/5547988455504.*Direito%20Civil/);
 await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('formulário prepara a mensagem sem afirmar envio',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{window.open=(...args)=>{window.__opened=args;return null;};});
 await page.getByLabel('Nome',{exact:true}).fill('Cliente Teste');await page.getByLabel('WhatsApp',{exact:true}).fill('47999999999');
 await page.getByLabel('E-mail').fill('cliente@example.com'); await page.getByLabel('Mensagem',{exact:true}).fill('Gostaria de orientação.');
 await page.getByRole('button',{name:'Preparar mensagem'}).click();
 await expect(page.getByRole('status')).toContainText('Conclua o envio no WhatsApp');
 const opened=await page.evaluate(()=>window.__opened);expect(decodeURIComponent(opened[0])).toContain('Gostaria de orientação.');expect(opened[2]).toBe('noopener,noreferrer');
});
test('menu mobile e links de contato',async({page},info)=>{
 await page.goto('/');if(info.project.name==='mobile'){
 await page.getByRole('button',{name:'Abrir menu'}).click(); await expect(page.locator('#main-nav')).toBeVisible();
 await page.locator('#main-nav').getByRole('link',{name:'Contato',exact:true}).click();await expect(page.getByRole('button',{name:'Abrir menu'})).toHaveAttribute('aria-expanded','false');
 }
 await expect(page.getByRole('link',{name:'Ver avaliações no Google'})).toHaveAttribute('href','https://share.google/r67MvaW0zk8jdfiZ9');
});
test('layout sem rolagem horizontal em diferentes larguras',async({page})=>{
 for(const width of [320,375,768,1024]){
 await page.setViewportSize({width,height:900}); await page.goto('/'); await page.evaluate(()=>document.fonts.ready);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`largura ${width}`).toBe(true);
 }
});
