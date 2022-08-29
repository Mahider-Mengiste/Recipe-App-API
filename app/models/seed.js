// seed.js is going to be the file we run, whenever we want to seed our database, we'll create a bunch of  at once.

// we want to be careful with this, because when we run it, it'll delete all of the recipes in the db. 

// we can modify this later, to only delete recipes that don't have an owner already, but we'll keep it simple for recipe

const mongoose = require('mongoose')
const Recipe = require('./recipe')
const db = require('../../config/db')

const startRecipes = [
    {   recipeCreator: 'mah',
        recipeName: 'Green Bean and Plum Salad',
        recipeType: 'indian',
        image: 'https://edamam-product-images.s3.amazonaws.com/web-img/ffb/ffb0fd1a00346183ed14d76486201470.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJHMEUCIQCZaHSR2G3bkss8rlFtyOeLRVhEGd2NRb6S92keC66GGQIgXmYeCnLac9c7D9Bc6lrXwWv6sgif8SSLIPXDF1CcOWkq0gQIeRAAGgwxODcwMTcxNTA5ODYiDFZzUp%2Fzj%2F4lUcg5NyqvBOryG9bocwwK1Pom30Ds42cHmY2jcYYDt7K%2B5RkGTen30T%2BHutkAzYO3%2FV9pdXXLJSpHxyZlnR28Syx5rQcCEmL3GhF1NGMNocZel8HCzH2kJVkB3wpQH0gnKEB6s4b7WPNzC4wMEYy5w0hJ%2Bx7yk3Y3DTaIA5SlKSmLKTWatnj7b7uPa9CPtRujro%2BGjy%2BnjcbhsT0ec8842n3mAoP1moBdqrNZieLXU76YfNKB2E%2BSdZ9%2BNbE0ymKK2GA2x1uANa0RhlKEA2L5mCedpmYCHEwMQRvTK%2FdyVVPEE537PzoCM%2BXEErTNZpi84WDDoeiyOubXbNZYl%2B83WZuy6SCvYNGXFR7LCL%2Beiz9O6nG3HZ%2F5YznOpbOFN2frl2ISJfnhxObYQ%2F5qC6PPHYFz557uSeRBkznVTw1xjw%2Buv114q9ouQweAdgl1GRILpnz3nrODpqMzuqo3RGCJtZ67lRGc4%2FaTo158uqYCf4I4oa9rk%2Bx3khYabILsr9OirYXcHGXyRuGRe0sPVreIFOTv1ickNCchEcWFoMmCQ6rUAGd6rAkfdr2iXCowvqjTY9f4Wu3FRgwuztiT1jn6duzd%2FZZNTeFifNzUb1d4nziS39IprrnD%2FQ4knCCQEPijeu2pAvzocCHKgDaZuL2Wu6TMP%2BtjPoez%2BXX8B6SPVqnGp8rOHaJ1ntDJcZU234VWhd19ZF18cp%2BzZXwE9gEx0BYf0II40jPRQvPJ15nu7S1l0scPPcwwzMOOmAY6qQHsbvOfIPZ8tjC1lQrE6VjcmPku435ySUW1zcrZgPSSouktsCjiehBL3gfOM9YI7Mu4iDw6n%2B31pE0kgJ7U3IVthP3wdUsg1BoHjBhtt%2FGQStTq1R7pPx02uO13zZHdXdFUbUow2oNWV%2Br6v1kid1eloCJNvUSh2ke3OWrJNNSQQM3pDxqMTzrI3tJglNi7fTpLlIAEXP%2Fuw0qeFlJTrhfGXULMaKDfZDyi&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220822T164240Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIUG4FDTH%2F20220822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c5571bb98eb5abb962ef6309b081b58e1f97a05033658bf7bf1f7570f285012d',
        Instruction: '1 tbsp lemon juice pinch of sal 4 tbsp olive oil small bunch finely chopped chives200g bag mixed salad leaves2 sliced, ripe avocados',
        
        
    },
     {  recipeCreator: 'mah',
        recipeName: 'Green Salad with avocado',
        recipeType: 'indian',
        image: 'https://edamam-product-images.s3.amazonaws.com/web-img/569/569920c2490386e42a7af54872a26ef8.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJHMEUCIQCZaHSR2G3bkss8rlFtyOeLRVhEGd2NRb6S92keC66GGQIgXmYeCnLac9c7D9Bc6lrXwWv6sgif8SSLIPXDF1CcOWkq0gQIeRAAGgwxODcwMTcxNTA5ODYiDFZzUp%2Fzj%2F4lUcg5NyqvBOryG9bocwwK1Pom30Ds42cHmY2jcYYDt7K%2B5RkGTen30T%2BHutkAzYO3%2FV9pdXXLJSpHxyZlnR28Syx5rQcCEmL3GhF1NGMNocZel8HCzH2kJVkB3wpQH0gnKEB6s4b7WPNzC4wMEYy5w0hJ%2Bx7yk3Y3DTaIA5SlKSmLKTWatnj7b7uPa9CPtRujro%2BGjy%2BnjcbhsT0ec8842n3mAoP1moBdqrNZieLXU76YfNKB2E%2BSdZ9%2BNbE0ymKK2GA2x1uANa0RhlKEA2L5mCedpmYCHEwMQRvTK%2FdyVVPEE537PzoCM%2BXEErTNZpi84WDDoeiyOubXbNZYl%2B83WZuy6SCvYNGXFR7LCL%2Beiz9O6nG3HZ%2F5YznOpbOFN2frl2ISJfnhxObYQ%2F5qC6PPHYFz557uSeRBkznVTw1xjw%2Buv114q9ouQweAdgl1GRILpnz3nrODpqMzuqo3RGCJtZ67lRGc4%2FaTo158uqYCf4I4oa9rk%2Bx3khYabILsr9OirYXcHGXyRuGRe0sPVreIFOTv1ickNCchEcWFoMmCQ6rUAGd6rAkfdr2iXCowvqjTY9f4Wu3FRgwuztiT1jn6duzd%2FZZNTeFifNzUb1d4nziS39IprrnD%2FQ4knCCQEPijeu2pAvzocCHKgDaZuL2Wu6TMP%2BtjPoez%2BXX8B6SPVqnGp8rOHaJ1ntDJcZU234VWhd19ZF18cp%2BzZXwE9gEx0BYf0II40jPRQvPJ15nu7S1l0scPPcwwzMOOmAY6qQHsbvOfIPZ8tjC1lQrE6VjcmPku435ySUW1zcrZgPSSouktsCjiehBL3gfOM9YI7Mu4iDw6n%2B31pE0kgJ7U3IVthP3wdUsg1BoHjBhtt%2FGQStTq1R7pPx02uO13zZHdXdFUbUow2oNWV%2Br6v1kid1eloCJNvUSh2ke3OWrJNNSQQM3pDxqMTzrI3tJglNi7fTpLlIAEXP%2Fuw0qeFlJTrhfGXULMaKDfZDyi&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220822T164104Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFIUG4FDTH%2F20220822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b648aacf331a453c38b219c2631786f01cde200fd3fd06411362462657018114',
        Instruction: '1 tbsp lemon juice pinch of sal 4 tbsp olive oil small bunch finely chopped chives200g bag mixed salad leaves2 sliced, ripe avocados',
        
        
    },
     {  recipeCreator: 'mah',
        recipeName: 'Buffalo Chicken Dip',
        recipeType: 'indian',
        image: 'https://edamam-product-images.s3.amazonaws.com/web-img/98c/98cb4028885b6adc5d7b85d3901469c3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJGMEQCIF93PS5MHL4w8ytuVMKpKY5vt%2Bi8%2FkMyxe56kpfNfWg8AiBTx2HtyntChQuO9CTWK5wo%2FVhgg16C3rzOztaScF5obirSBAh5EAAaDDE4NzAxNzE1MDk4NiIMIfwn6yj01B35mvyVKq8E4CkxtUziF94JzCYxcmm%2F78ws5UWyMBmwpblJdfyY8LPEZLL6GlqjGziEt5mfJ6m8J4c5ys7eCe1x8DPq5UG00Tiofl2R6%2FcAnSyEGuGkBYr8uSL96Rw5FzVWsnqAHIUQCNjKKhwGYkNsu6DDHW5cdzN6IJ9JqFl5Ku8MCDwVKjZnT4mAouVAAA2T1Hgd%2FnG%2B6KGwSUhLqxpQ15lqkQQE2nREdJO1bWyTiw%2BbkI%2FJAFEVOVZnTohp5zC5zysFddwwFw43Mxcr2LCMAVa9l8uqSY1e0N4uNx10cgdSb%2FMIq2DELfQutQGw9xAfl5jqef6%2FZ5tlhwnuDDmEBAzaIU4sbnVNUIml8%2BGlmDWZ%2Bx41LnmvOEXJWdfKLmemyQHGBBeyIG4ZrqhvJGH%2FUsyPvka74AuaxSor7iTHjn%2BGK0tRO8lemJUhvTWc%2BjRVNtDgnr9tLo%2BhYkIzRRJsyNiH2CkOWYrZ96xMgIiuksFXp0OLWVPsN8Tlv2HSvEUZIomT72NF0UG1pvaS67NcaBxoeueysDIhD7yb0Ia8QRNEMhWBdLiXb70M681GPaccFbOHkucx5h5BrVQ02nLzKTp0DH%2BJDIDanbMkNLxLnkbbG2deQ1KzD0DXbMpEY0f%2BF6xCLS5AlU6Mw6kyTb%2FiQrXS3C4QeQxLUhbXIpjNW0rj%2F2UN9nMeuXfT%2FC1B%2BTlTwxL9IQdIFxYf0bpewBqoiJMnOWwElXDdLtBpGqtQedsHN6SfXTDvw46YBjqqAfg1b9AbAaFs7So6m1ia%2BxFftQY6kSYuUQpyP%2Boebf6qAcsh2v8vVwhuikChn0C0IsW%2BAMWJ6vyEJeJVfkkZQ5SHygFQpNkSth0HVnGlvDKzpT%2FUP29dkRPNk7dRyM12mjovsqblwfwlmJvLSp07zzS8vbldSygi1KxXkXnZP6NbeCpViIJ84SzPukmik%2Fn6akB0fcO%2BHkgQz5tx5GTVbsFSJheLmEhYJq2U&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220822T164306Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLHGPE2HH%2F20220822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=93b020a8dd2be1d2d35beeeeac6fae6b24e6c42445cde4534f7f9533bb11756c',
        Instruction: '1 tbsp lemon juice pinch of sal 4 tbsp olive oil small bunch finely chopped chives200g bag mixed salad leaves2 sliced, ripe avocados',
        
        
    },
    {   recipeCreator: 'mah',
        recipeName: 'Tuna Melt Potato Skins recipes',
        recipeType: 'indian',
        image: 'https://edamam-product-images.s3.amazonaws.com/web-img/21b/21b9a15fde98cf96c8379ba4629fb5f2?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJGMEQCICf8Ytwuql46NTlfVTPLYjhCly2q2aGPtjC5nvIeILfkAiB6wEOGUG4K%2BwWtgqX0ar2T%2F8KSsSt87Lf%2B0xAlVCmXdyrSBAh5EAAaDDE4NzAxNzE1MDk4NiIMq7V1b5jjkXidwCTaKq8E02ImsslDUO9TMNA54btQrMa0oep4RAJyF4RKOsO%2BeNbSxg0ynIizabO2v%2BFFysx0%2BX4Zz9WTO6H3pSK4AxwNvihPiMNULdMZd%2FEEoFc3ffJ4mN9dUSh7eCHqID4t%2BUBcdM0jcvjg8OLuTz7%2FRJQNV%2FKr1KLTg%2BmWc6ftZs2KQ5DhboovQ0ZMQfHKCY2GDsOJjA4rSy%2Foom3%2FVi2pDBsN8CS%2FfIEGbcVoo71nmuW7h7QJs7TRWfwCvlhdLaroy2hQbB5NfZSnpqhkEjbhwKskWRJnQVjB6yhsNF72ZGLWWbhZ6M%2FR8lxYkwF7yk0x6kVbuTZQsT1MrfJr8AgGOi%2F%2BFlK3C32W6NIW0omG%2BCf00WVgTh4UERL%2Bg4ssL%2Fm5tNAHegIernBcJ2QS2cL%2F%2Buw42JmZBh6BZY%2FYS4BQTIKLQaf2P9jiBnfV2NLUgs9HC8QFX6efbSUyO9b01pmcRbhSV%2FkZL8a0kA8wPMdrad1Uux7B82y7sHI2bFXueOAOl9Ouq3ZDLiMvGoU0HgTWhDpdF88le7QWfOSR%2FG5oFdfAUPeTLx1uWitdSGvAnwUTiGZ5verqWVfUVUI6UF0rKywLGXy9mIGLtRAMj3r7hz76bJNou%2B%2BJpXGV7rDHrxARwgFqKPKny12yqPjV0Y3DMpyRAVU6Cy4RfuOOz7W59NsEWQVEM%2FufkO4zbwsLbUvetqCACSFc0PqdDMoo%2F4%2F388hgiD6nVynZcCPuh9HQREG89jC1zY6YBjqqAcyFQYUMIbDtD2Weztl%2BQCNImNLFKYUgF0z62%2FQ3TOF5UEEYCbDth0FmRAPPSs0lKUl81rKZEU91LO6HtdTdCm%2FduktrSCiCzPAgy9EHxtJwWjkEGYDnFBTG9oWrdXwqUa901VGzO6sUfD2H5gvJf88GOhNNsmdUZKnBlCBvCXbrSMvbWcRUZvTXZiYSIKdfBKM2guUhBxlS8pGkmFhI2YQki0ELzMglF6pV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220822T164358Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFB2GVKHQQ%2F20220822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8f8b98781cad17b7d54579fdfe0043d2eaa3a3775fc6228f9bfa7f439cfd3dae',
        Instruction: '1 tbsp lemon juice pinch of sal 4 tbsp olive oil small bunch finely chopped chives200g bag mixed salad leaves2 sliced, ripe avocados',
        
        
    },
    {   recipeCreator: 'mah',
        recipeName: 'Fennel and Orange Salad',
        recipeType: 'indian',
        image: 'https://edamam-product-images.s3.amazonaws.com/web-img/62a/62a9f27b3ae6750a4725530c9f5f4746.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAAaCXVzLWVhc3QtMSJGMEQCIF93PS5MHL4w8ytuVMKpKY5vt%2Bi8%2FkMyxe56kpfNfWg8AiBTx2HtyntChQuO9CTWK5wo%2FVhgg16C3rzOztaScF5obirSBAh5EAAaDDE4NzAxNzE1MDk4NiIMIfwn6yj01B35mvyVKq8E4CkxtUziF94JzCYxcmm%2F78ws5UWyMBmwpblJdfyY8LPEZLL6GlqjGziEt5mfJ6m8J4c5ys7eCe1x8DPq5UG00Tiofl2R6%2FcAnSyEGuGkBYr8uSL96Rw5FzVWsnqAHIUQCNjKKhwGYkNsu6DDHW5cdzN6IJ9JqFl5Ku8MCDwVKjZnT4mAouVAAA2T1Hgd%2FnG%2B6KGwSUhLqxpQ15lqkQQE2nREdJO1bWyTiw%2BbkI%2FJAFEVOVZnTohp5zC5zysFddwwFw43Mxcr2LCMAVa9l8uqSY1e0N4uNx10cgdSb%2FMIq2DELfQutQGw9xAfl5jqef6%2FZ5tlhwnuDDmEBAzaIU4sbnVNUIml8%2BGlmDWZ%2Bx41LnmvOEXJWdfKLmemyQHGBBeyIG4ZrqhvJGH%2FUsyPvka74AuaxSor7iTHjn%2BGK0tRO8lemJUhvTWc%2BjRVNtDgnr9tLo%2BhYkIzRRJsyNiH2CkOWYrZ96xMgIiuksFXp0OLWVPsN8Tlv2HSvEUZIomT72NF0UG1pvaS67NcaBxoeueysDIhD7yb0Ia8QRNEMhWBdLiXb70M681GPaccFbOHkucx5h5BrVQ02nLzKTp0DH%2BJDIDanbMkNLxLnkbbG2deQ1KzD0DXbMpEY0f%2BF6xCLS5AlU6Mw6kyTb%2FiQrXS3C4QeQxLUhbXIpjNW0rj%2F2UN9nMeuXfT%2FC1B%2BTlTwxL9IQdIFxYf0bpewBqoiJMnOWwElXDdLtBpGqtQedsHN6SfXTDvw46YBjqqAfg1b9AbAaFs7So6m1ia%2BxFftQY6kSYuUQpyP%2Boebf6qAcsh2v8vVwhuikChn0C0IsW%2BAMWJ6vyEJeJVfkkZQ5SHygFQpNkSth0HVnGlvDKzpT%2FUP29dkRPNk7dRyM12mjovsqblwfwlmJvLSp07zzS8vbldSygi1KxXkXnZP6NbeCpViIJ84SzPukmik%2Fn6akB0fcO%2BHkgQz5tx5GTVbsFSJheLmEhYJq2U&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220822T164507Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLHGPE2HH%2F20220822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e65152eba36d5be1a671fd40d3fa917b13dc4940b5d1bc4ad97b1eec64cebbfd',
        Instruction: '1 tbsp lemon juice pinch of sal 4 tbsp olive oil small bunch finely chopped chives200g bag mixed salad leaves2 sliced, ripe avocados',
        
        
    },
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // remove all of the recipes
        // delete recipe without an owner
        Recipe.deleteMany({ owner: null })
            .then(deletedRecipes => {
                console.log('deletedrecipes', deletedRecipes)
                // the next step is to use our startRecipes array to create our seeded Recipes
                Recipe.create(startRecipes)
                    .then(newRecipes => {
                        console.log('the new recipes', newRecipes)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })