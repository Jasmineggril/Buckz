document.addEventListener('DOMContentLoaded', function() {
    // Elementos do resumo
    const subtotalElement = document.getElementById('subtotal');
    const totalCompraElement = document.getElementById('total-compra');
    const freteInfoElement = document.getElementById('frete-info');
    const valorFreteElement = document.getElementById('valor-frete');
    
    // Variáveis de estado
    let valorFrete = 0;
    
    // Função para formatar moeda
    function formatarMoeda(valor) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }
    
    // Função para calcular totais
    function calcularTotais() {
        let subtotal = 0;
        
        document.querySelectorAll('.produto').forEach(produto => {
            const precoUnitario = parseFloat(produto.dataset.preco);
            const quantidade = parseInt(produto.querySelector('.quantidade').textContent);
            const precoTotal = precoUnitario * quantidade;
            
            produto.querySelector('.preco-total').textContent = formatarMoeda(precoTotal);
            subtotal += precoTotal;
        });
        
        subtotalElement.textContent = formatarMoeda(subtotal);
        totalCompraElement.textContent = formatarMoeda(subtotal + valorFrete);
    }
    
    // Eventos de quantidade
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', function() {
            const quantidadeElement = this.parentElement.querySelector('.quantidade');
            let quantidade = parseInt(quantidadeElement.textContent);
            quantidadeElement.textContent = quantidade + 1;
            calcularTotais();
        });
    });
    
    document.querySelectorAll('.btn-diminuir').forEach(btn => {
        btn.addEventListener('click', function() {
            const quantidadeElement = this.parentElement.querySelector('.quantidade');
            let quantidade = parseInt(quantidadeElement.textContent);
            
            if (quantidade > 1) {
                quantidadeElement.textContent = quantidade - 1;
                calcularTotais();
            }
        });
    });
    
    // Eventos de remover produto
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const produto = this.closest('.produto');
            produto.style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                produto.remove();
                calcularTotais();
                
                if (document.querySelectorAll('.produto').length === 0) {
                    document.getElementById('tabela-produtos').innerHTML = `
                        <tbody>
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 40px 0; color: #666;">
                                    Seu carrinho está vazio
                                </td>
                            </tr>
                        </tbody>
                    `;
                }
            }, 300);
        });
    });
    
    // Evento de calcular frete
    document.getElementById('calcular-frete').addEventListener('click', function() {
        const cep = document.getElementById('cep').value.trim();
        
        if (cep.length === 8 && /^\d+$/.test(cep)) {
            // Simula cálculo de frete com valor aleatório entre 10 e 50 reais
            valorFrete = Math.random() * 40 + 10;
            
            valorFreteElement.textContent = formatarMoeda(valorFrete);
            freteInfoElement.style.display = 'flex';
            calcularTotais();
            
            // Feedback visual
            this.textContent = 'Recalcular';
            this.style.background = '#A9BF04';
        } else {
            alert('Por favor, digite um CEP válido (8 dígitos)');
        }
    });
    
    // Inicializa totais
    calcularTotais();
});