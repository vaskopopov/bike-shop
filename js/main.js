// write your code here
// use products array from the other file in here 
// (yes you can use it, it doesn't matter if it's from another file)
//---------------------------------------------------------------------------
$(function() {
    //-----------------------------------------------------------------------
    //          Inicijalizacija na promenlivi

    var countMale, countFemale, brandsPart, card="", uniqueBrands=[];
    //-----------------------------------------------------------------------

    // $.get('http://json-project3.herokuapp.com/products')
    $.getJSON('js/products.json')
    .then(function(data){

        // console.log(products);

        countMale = data.filter(function(v) {
            return v.gender == 'MALE'
        }).length;

        countFemale = data.filter(function(v) {
            return v.gender == 'FEMALE'
        }).length;

        // Get unique brands from data
        
        for(i = 0; i< data.length; i++){    
            if(uniqueBrands.indexOf(data[i].brand) === -1){
                uniqueBrands.push(data[i].brand);        
            }        
        }
        return data;
    })
    .then(function(data){
        // popolnuvanje na badge-ovite so kolicinite
        $('.badge-all').html(data.length);
        $('.badge-male').html(countMale);
        $('.badge-female').html(countFemale);
        brandsPart=$('#filters');
        let brands="";
        for(let i=0;i<uniqueBrands.length;i++){
            let brandCount= data.filter(function(v) {
                return v.brand == uniqueBrands[i]
            }).length;
            brands+=`<li data-filter="${uniqueBrands[i]}">${uniqueBrands[i]}<span class='badge'>${brandCount}</span></li>`;
        }
        brandsPart.append(brands);

        return data;
    })
    .then(function(data){
        createCards(data);
    });
    //-----------------------------------------------------------------------
    //**********  DODELUVANJE KLASI PRI HOVER NA FILTER-MENITO  ********** */
    $(document)
    .on('mouseover',"li:has(span)",function(){
        $(this).css('cursor',' pointer');
        if($(this).css('color')!='orange'){
            $(this).addClass('hovered');
        }})
    .on('mouseout',"li:has(span)",function(){
        $(this).removeClass('hovered');
    })
    .on('click',"li:has(span)",function(){
        $('li').removeClass('clicked');
        $('.badge').removeClass('clicked');
        $(this).addClass('clicked');
    })
    //-----------------------------------------------------------------------
    //*************  KREIRANJE KARTICKI I NIVNO FILTRIRANJE***  ********** */

    function createCards(items){
        for(let i=0;i<items.length;i++){

            card+=`<li class="card" data-bike="*" data-gender="${items[i].gender.toLowerCase()}" data-brand="${items[i].brand}"><img src="img/${items[i].image}.png"><p class="name item">${items[i].name}</p><p class="item">${items[i].price} $</p></li>`;
        }
        $('#cards ul').append(card);
    }

    $(document).on('click','li:has(span)',function(){
        let selectedFilter=$(this).attr('data-filter');
        filter(selectedFilter);
        // console.log(selectedFilter);
    })

    function filter(e) {
        let filterBy="";
        if(e=='male' || e=='female'){
            filterBy='gender';
        } else if (e=='*'){
            filterBy='bike';
        } else {
            filterBy='brand';
        }
        $('.card').fadeOut(300, $('.card').hide())
            .filter(`[data-${filterBy}="${e}"]`)
        .fadeIn(1000);
    }
});//************************** END ******************************* */